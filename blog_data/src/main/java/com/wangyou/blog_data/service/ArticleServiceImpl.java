package com.wangyou.blog_data.service;

import com.wangyou.blog_data.dao.ArticleDao;
import com.wangyou.blog_data.entity.Article;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ArticleServiceImpl implements ArticleService {
    @Autowired
    private ArticleDao articleDao;

    @Override
    public List<Article> findArticleList(String keys, Integer index, Integer length) {
        return articleDao.findArticleList(keys, index, length);
    }

    @Override
    public Article findDetail(String aId) {
        Integer result = articleDao.addView(aId);
        return result==1?articleDao.findDetail(aId):new Article();
    }
}
