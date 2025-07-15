import { spawn } from 'child_process';
import { FastifyInstance } from 'fastify';
import fs from 'fs';
import path from 'path';
import { FastifyError } from 'fastify';

export default async function downloadVideo(fastify: FastifyInstance) {
  fastify.post('/download', async (request, reply) => {
    const { url } = request.body as { url?: string };

    if (!url) {
      return reply.status(400).send({ error: 'URL is required' });
    }

    const downloadsDir = path.resolve('./cache');
    const filePath = path.join(downloadsDir, 'video.mp4');

    try {
      fs.mkdirSync(downloadsDir, { recursive: true });
      await new Promise<void>((resolve, reject) => {
        const proc = spawn('yt-dlp', ['-f', 'best', '-o', filePath, url]);

        proc.on('error', (err) => reject(err));

        proc.on('close', (code) => {
          if (code === 0 && fs.existsSync(filePath)) {
            resolve();
          } else {
            reject(new Error('yt-dlp failed.'));
          }
        });
      });

      const stat = fs.statSync(filePath);

      reply
        .header('Content-Type', 'video/mp4')
        .header('Content-Disposition', 'attachment; filename="video.mp4"')
        .header('Content-Length', stat.size);

      const stream = fs.createReadStream(filePath);

      stream.on('close', () => {
        fs.unlink(filePath, () => {});
      });

      return reply.send(stream);

    } catch (err) {
      
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, () => {});
      }

      return reply.status(500).send({ error: 'Failed to download video', details: (err as FastifyError).message });
    }
  });
}
