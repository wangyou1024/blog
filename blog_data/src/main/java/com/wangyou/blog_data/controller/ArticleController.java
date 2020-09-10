package com.wangyou.blog_data.controller;


import com.wangyou.blog_data.entity.Article;
import com.wangyou.blog_data.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/article")
@CrossOrigin
public class ArticleController {
    @Autowired
    private ArticleService articleService;

    @RequestMapping("/findArticleList")
    public @ResponseBody
    List<Article> findArticleList(@RequestParam("keys") String keys,
                                  @RequestParam("index") Integer index,
                                  @RequestParam("length") Integer length) {
        List<Article> articleList = articleService.findArticleList(keys, index, length);
        return articleList;
    }

    @RequestMapping("/findDetail")
    public @ResponseBody
    Article findDetail(@RequestParam("aId") String aId){
        return articleService.findDetail(aId);
    }

    @RequestMapping("/test")
    public @ResponseBody
    List<Article> test(@RequestParam("keys") String keys,
                                  @RequestParam("index") Integer index,
                                  @RequestParam("length") Integer length) {
        List<Article> articleList = articleService.findArticleList(keys, index, length);
        return articleList;
    }
}
