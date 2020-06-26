import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

<<<<<<< HEAD
const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
=======
export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp'),
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
>>>>>>> be3a5d6328466d0f97dc4acde40183ecac95475b
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
