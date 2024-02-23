const fs = require('fs');
const express = require('express');
const router = express.Router();
// MULTER UPLOAD
const multer = require('multer');
const {
<<<<<<< HEAD
  updateDocument,
  findDocument,
  toSafeFileName,
  insertDocument,
  insertDocuments,
=======
    updateDocument,
    findDocument,
    toSafeFileName,
    insertDocument,
    insertDocuments,
>>>>>>> task/create-cart-cartDetail
} = require('../helpers/MongoDbHelper');

const UPLOAD_DIRECTORY = './public/images/uploads';

const upload = multer({
<<<<<<< HEAD
  storage: multer.diskStorage({
    contentType: multer.AUTO_CONTENT_TYPE,
    destination: function (req, file, callback) {

      const PATH = `${UPLOAD_DIRECTORY}/media/${file.fieldname}`;
      if (!fs.existsSync(PATH)) {
        // Create a directory
        fs.mkdirSync(PATH, { recursive: true });
      }
      callback(null, PATH);
    },
    filename: function (req, file, callback) {
      const safeFileName = toSafeFileName(file.originalname);
      callback(null, safeFileName);
    },
  }),
});

router.post('/upload-single', (req, res) =>
  upload.single('file')(req, res, async (err) => {
    try {
      if (err instanceof multer.MulterError) {
        res.status(500).json({ type: 'MulterError', err: err });
      } else if (err) {
        res.status(500).json({ type: 'UnknownError', err: err });
      } else {
        const imageUrl = `/uploads/media/${req.file.filename}`;
        const name = req.file.filename;

        const response = await insertDocument(
          { location: imageUrl, name },
          'Media',
        );
        res.status(200).json({ ok: true, payload: response });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ ok: false, error });
    }
  }),
);

router.post('/upload-multiple', (req, res) =>
  upload.array('files', 3)(req, res, async (err) => {
    try {
      if (err instanceof multer.MulterError) {
        res.status(500).json({ type: 'MulterError', err: err });
      } else if (err) {
        res.status(500).json({ type: 'UnknownError', err: err });
      } else {
        const files = req.files;

        const dataInsert = files.reduce((prev, nextP) => {
          prev.push({ name: nextP.filename, location: nextP.path });
          return prev;
        }, []);

        const response = await insertDocuments(dataInsert, 'Media');

        res.status(200).json({ ok: true, payload: response });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ ok: false, error });
    }
  }),
);

router.get('/productImages/:id', async (req, res, next) => {
  const { id } = req.params;

  const found = await findDocument(id, 'Media');
  if (!found) {
    return res
      .status(410)
      .json({ message: `${collectionName} with id ${id} not found` });
  }

  res.status(200).json({ ok: true, payload: found });
});

router.post('/productImages/update/:id', async (req, res) => {
  const { id } = req.params;

  const found = await findDocument(id, 'Media');
  if (!found) res.status(410).json({ message: `${collectionName} with id ${id} not found` });

  upload.single('file')(req, res, async (err) => {
    try {
      if (err instanceof multer.MulterError) {
        res.status(500).json({ type: 'MulterError', err: err });
      } else if (err) {
        res.status(500).json({ type: 'UnknownError', err: err });
      } else {
        const imageUrl = `/uploads/media/${req.file.filename}`;
        const name = req.file.filename;

        const response = await updateDocument(
          { _id: id },
          {
            location: imageUrl,
            name,
          },
          'Media',
        );

        res.status(200).json({ ok: true, payload: response });
      }
    } catch (error) {
      res.status(500).json({ ok: false, error });
    }
  });
});

module.exports = router;
=======
    storage: multer.diskStorage({
        contentType: multer.AUTO_CONTENT_TYPE,
        destination: function (req, file, callback) {

            const PATH = `${UPLOAD_DIRECTORY}/media/${file.fieldname}`;
            if (!fs.existsSync(PATH)) {
                // Create a directory
                fs.mkdirSync(PATH, { recursive: true });
            }
            callback(null, PATH);
        },
        filename: function (req, file, callback) {
            const safeFileName = toSafeFileName(file.originalname);
            callback(null, safeFileName);
        },
    }),
});

router.post('/upload-single', (req, res) =>
    upload.single('file')(req, res, async (err) => {
        try {
            if (err instanceof multer.MulterError) {
                res.status(500).json({ type: 'MulterError', err: err });
            } else if (err) {
                res.status(500).json({ type: 'UnknownError', err: err });
            } else {
                const imageUrl = `/uploads/media/${req.file.filename}`;
                const name = req.file.filename;

                const response = await insertDocument(
                    { location: imageUrl, name },
                    'Media',
                );
                res.status(200).json({ ok: true, payload: response });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ ok: false, error });
        }
    }),
);

router.post('/upload-multiple', (req, res) =>
    upload.array('files', 3)(req, res, async (err) => {
        try {
            if (err instanceof multer.MulterError) {
                res.status(500).json({ type: 'MulterError', err: err });
            } else if (err) {
                res.status(500).json({ type: 'UnknownError', err: err });
            } else {
                const files = req.files;

                const dataInsert = files.reduce((prev, nextP) => {
                    prev.push({ name: nextP.filename, location: nextP.path });
                    return prev;
                }, []);

                const response = await insertDocuments(dataInsert, 'Media');

                res.status(200).json({ ok: true, payload: response });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ ok: false, error });
        }
    }),
);

router.get('/productImages/:id', async (req, res, next) => {
    const { id } = req.params;

    const found = await findDocument(id, 'Media');
    if (!found) {
        return res
            .status(410)
            .json({ message: `${collectionName} with id ${id} not found` });
    }

    res.status(200).json({ ok: true, payload: found });
});

router.post('/productImages/update/:id', async (req, res) => {
    const { id } = req.params;

    const found = await findDocument(id, 'Media');
    if (!found) res.status(410).json({ message: `${collectionName} with id ${id} not found` });

    upload.single('file')(req, res, async (err) => {
        try {
            if (err instanceof multer.MulterError) {
                res.status(500).json({ type: 'MulterError', err: err });
            } else if (err) {
                res.status(500).json({ type: 'UnknownError', err: err });
            } else {
                const imageUrl = `/uploads/media/${req.file.filename}`;
                const name = req.file.filename;

                const response = await updateDocument(
                    { _id: id },
                    {
                        location: imageUrl,
                        name,
                    },
                    'Media',
                );

                res.status(200).json({ ok: true, payload: response });
            }
        } catch (error) {
            res.status(500).json({ ok: false, error });
        }
    });
});

module.exports = router;
>>>>>>> task/create-cart-cartDetail
