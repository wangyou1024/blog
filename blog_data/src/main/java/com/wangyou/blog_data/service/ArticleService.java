package com.wangyou.blog_data.service;

import com.wangyou.blog_data.entity.Article;

import java.util.List;

public interface ArticleService {
    List<Article> findArticleList(String keys,Integer index, Integer length);
    Article findDetail(String aId);
}
