package com.wangyou.blog_data.dao;

import com.wangyou.blog_data.entity.Comment;
import com.wangyou.blog_data.entity.SonComment;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommentDao {
    List<Comment> findComments(String aId);
    Integer addMainComment(Comment comment);
    Integer addOtherComment(SonComment sonComment);
}
