import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (error, data) => {
    if (error) return res.status(500).send(error);
    return res.status(200).json(data);
  })
}

export const getPost = (req, res) => {
  const q = "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`, `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

  db.query(q, [req.params.id], (error, data) => {
    if (error) return res.status(500).json(error)
    return res.status(200).json(data[0]);
  })
}

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('未通過驗證');

  jwt.verify(token, 'jwtkey', (error, userInfo) => {
    if (error) return res.status(403).json('Token is invalid!');

    const q = "INSERT INTO posts (`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)";
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id
    ]

    db.query(q, [values], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.json('文章新增成功')
    })
  })
}

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('未通過驗證');

  jwt.verify(token, 'jwtkey', (error, userInfo) => {
    if (error) return res.status(403).json('Token is invalid!');

    // 若 postId 不等於 uid 則無法刪除
    const postId = req.params.id
    const q = "DELETE FROM posts WHERE `id` = ? AND uid = ?"
    db.query(q, [postId, userInfo.id], (error, data) => {
      if (error) return res.status(403).json('您只能刪除自己的文章')

      return res.json('刪除成功')
    })
  })
}

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('未通過驗證');

  jwt.verify(token, 'jwtkey', (error, userInfo) => {
    if (error) return res.status(403).json('Token is invalid!');

    const postId = req.params.id;
    const q = "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
    ]

    db.query(q, [...values, postId, userInfo.id], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.json('文章更新成功')
    })
  })
}