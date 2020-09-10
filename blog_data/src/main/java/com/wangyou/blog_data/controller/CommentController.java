package com.wangyou.blog_data.controller;

import com.wangyou.blog_data.entity.Comment;
import com.wangyou.blog_data.entity.SonComment;
import com.wangyou.blog_data.service.CommentService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/comment")
@CrossOrigin
public class CommentController {

    @Autowired
    private CommentService commentService;

    @RequestMapping("/findComment")
    public @ResponseBody
    List<Comment> findComment(@RequestParam("aId") String aId){
        return commentService.findComments(aId);
    }

    @PostMapping("/addMainComment")
    public @ResponseBody
    Comment addMainComment(@RequestBody Map<String,Object> info){
        Subject subject = SecurityUtils.getSubject();
        String email = (String) subject.getPrincipal();
        return commentService.addMainComment(email, info.get("aId").toString(), info.get("content").toString());
    }

    @PostMapping("/addOtherComment")
    public @ResponseBody
    SonComment addOtherComment(@RequestBody Map<String,Object> info){
        Subject subject = SecurityUtils.getSubject();
        String email = (String) subject.getPrincipal();
        String aId = (String) info.get("aId");
        String cId = (String) info.get("cId");
        String latter = (String) info.get("latter");
        String lName = (String) info.get("lName");
        String content = (String) info.get("content");
        return commentService.addOtherComment(email, aId, cId, latter, lName, content);
    }


}
