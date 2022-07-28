import { db } from '../../models/index.js';
import { json, Op } from 'sequelize';

const { wish, book } = db;

/**
 * GET
 * /api/wish
 */
export const getWishList = async (req, res) => {
  const { id: member_id } = req.decoded || req.params;

  const member_id_attr = {};
  if (member_id) {
    member_id_attr[Op.eq] = member_id;
  } else {
    member_id_attr[Op.not] = null;
  }

  try {
    const wishList = await wish.findAll({
      where: {
        member_id: member_id_attr,
      },
      include: [
        {
          model: book,
          as: 'book',
          attributes: ['id', 'title', 'thumbnail'],
        },
      ],
    });

    res.send(wishList);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

/**
 * POST
 * /api/wish
 */

export const addWishList = async (req, res) => {
  const { book_id } = req.body;
  const { id: member_id } = req.decoded;

  try {
    if (!book_id) {
      throw new Error('책 아이디가 입력되지 않았습니다');
    }
    const result = await wish.findOrCreate({
      where: {
        book_id,
        member_id,
      },
    });

    res.send(result);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

/**
 * DELETE
 * /api/wish
 */
export const deleteWishList = async (req, res) => {
  const { book_id } = req.params;
  const { id: member_id } = req.decoded;

  try {
    if (!book_id) {
      throw new Error('책 아이디가 입력되지 않았습니다');
    }
    await wish.destroy({
      where: {
        book_id,
        member_id,
      },
    });

    res.send({ result: 'ok' });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};
