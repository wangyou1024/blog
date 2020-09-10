package com.wangyou.blog_data.service;

import com.wangyou.blog_data.entity.Comment;
import com.wangyou.blog_data.entity.SonComment;

import java.util.List;

public interface CommentService {
    List<Comment> findComments(String aId);
    Comment addMainComment(String email, String aId, String content);
    SonComment addOtherComment(String email, String aId, String cId, String latter, String lName, String content);
}
