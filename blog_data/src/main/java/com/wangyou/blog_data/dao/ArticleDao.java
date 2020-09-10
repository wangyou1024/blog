package com.wangyou.blog_data.dao;

import com.wangyou.blog_data.entity.Article;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ArticleDao {
    List<Article> findArticleList(String keys,Integer index, Integer length);
    Article findDetail(String aId);
    Integer addView(String aId);
    Integer addMessage(String aId);
}
