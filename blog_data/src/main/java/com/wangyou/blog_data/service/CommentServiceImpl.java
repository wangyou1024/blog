package com.wangyou.blog_data.service;

import com.wangyou.blog_data.dao.ArticleDao;
import com.wangyou.blog_data.dao.CommentDao;
import com.wangyou.blog_data.dao.UserDao;
import com.wangyou.blog_data.entity.Comment;
import com.wangyou.blog_data.entity.SonComment;
import com.wangyou.blog_data.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentDao commentDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private ArticleDao articleDao;

    @Override
    public List<Comment> findComments(String aId) {
        return commentDao.findComments(aId);
    }

    @Override
    public Comment addMainComment(String email, String aId, String content) {
        articleDao.addMessage(aId);
        User user = userDao.findByEmail(email);
        Comment comment = new Comment();
        Instant now = Instant.now().plusMillis(TimeUnit.HOURS.toMillis(8));
        comment.setCId(now.toEpochMilli()+"");
        comment.setAId(aId);
        comment.setUId(user.getUId());
        comment.setContent(content);
        comment.setImage(user.getHeadImage());
        comment.setName(user.getUName());
        comment.setList(new ArrayList<>());
        Integer result = commentDao.addMainComment(comment);
        return result==1?comment:null;
    }

    @Override
    public SonComment addOtherComment(String email, String aId,String cId, String latter, String lName, String content) {
        articleDao.addMessage(aId);
        User user = userDao.findByEmail(email);
        SonComment sonComment = new SonComment();
        Instant now = Instant.now().plusMillis(TimeUnit.HOURS.toMillis(8));
        sonComment.setSId(now.toEpochMilli()+"");
        sonComment.setCId(cId);
        sonComment.setFormer(user.getUId());
        sonComment.setFName(user.getUName());
        sonComment.setLatter(latter);
        sonComment.setLName(lName);
        sonComment.setSonContent(content);
        Integer result = commentDao.addOtherComment(sonComment);
        return result==1?sonComment:null;
    }
}
