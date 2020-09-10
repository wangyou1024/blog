package com.wangyou.blog_data.controller;

import lombok.extern.slf4j.Slf4j;

import com.wangyou.blog_data.entity.User;
import com.wangyou.blog_data.service.UserService;
import com.wangyou.blog_data.utils.InfoUtil;
import com.wangyou.blog_data.utils.SaltUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Date;
import java.util.Map;

@Controller
@RequestMapping("/user")
@CrossOrigin
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @RequestMapping("/limit")
    public @ResponseBody
    String limit() {
        return "you can't achieve the resource, because you don't have the right.";
    }

    @PostMapping("/login")
    public @ResponseBody
    String login(@RequestBody User user) {
        // 1. get the shiro's subject
        Subject subject = SecurityUtils.getSubject();
        subject.logout();
        try {
            UsernamePasswordToken authenticationToken = new UsernamePasswordToken(user.getEmail(), user.getPassword());
            subject.login(authenticationToken);
            return "success";
        } catch (UnknownAccountException e) {
            e.printStackTrace();
            return "unknown account";
        } catch (IncorrectCredentialsException e) {
            e.printStackTrace();
            return "error password";
        } catch (Exception e) {
            e.printStackTrace();
            return "unknown exception";
        }
    }

    @RequestMapping("/logout")
    public @ResponseBody
    String logout() {
        Subject subject = SecurityUtils.getSubject();
        subject.logout();
        return "success";
    }

    @PostMapping("/register")
    public @ResponseBody
    String register(@RequestBody Map<String, Object> user, HttpSession session) {
        User user1 = new User();
        user1.setEmail(user.get("email").toString());
        user1.setPassword((String) user.get("password"));
        String code1 = (String) session.getAttribute("code");
        if (code1.equalsIgnoreCase((String) user.get("code"))) {
            try {

                Integer result = userService.register(user1);
                if (result == 1) {
                    return "success";
                } else {
                    return "exit";
                }
            }catch (Exception e){
                return "exit";
            }
        } else {
            return "error code";
        }
    }

    @RequestMapping("/code")
    public @ResponseBody
    String code(@RequestParam("email") String email, HttpSession session) {
        String code = SaltUtils.getSalt(4);
        session.setAttribute("code", code);
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = null;
        Context context = new Context();
        context.setVariable("code", code);
        String process = templateEngine.process("code.html", context);
        try {
            mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setText(process, true);
            mimeMessageHelper.setSubject("baiyou1024博客验证码");
            mimeMessageHelper.setSentDate(new Date());
            mimeMessageHelper.setFrom("baiyou1024@qq.com");
            mimeMessageHelper.setTo(email);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        javaMailSender.send(mimeMessage);
        return "success";
    }

    @RequestMapping("/launchResetting")
    public @ResponseBody
    String launchResetting(String email) {
        String salt = userService.findSaltByEmail(email);
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = null;
        Context context = new Context();
        context.setVariable("url", InfoUtil.BASE_URL + "/user/resetting?email=" + email + "&salt=" + salt);
        String process = templateEngine.process("resetting.html", context);
        try {
            mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setText(process, true);
            mimeMessageHelper.setSubject("baiyou1024博客密码重置");
            mimeMessageHelper.setSentDate(new Date());
            mimeMessageHelper.setFrom("baiyou1024@qq.com");
            mimeMessageHelper.setTo(email);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        javaMailSender.send(mimeMessage);
        return "success";
    }

    @RequestMapping("/resetting")
    public String resetting(String email, String salt) {
        userService.resettingPassword(email, salt);
        return "success";
    }


    @PostMapping("/getSelf")
    public @ResponseBody
    User getSelf() {
        Subject subject = SecurityUtils.getSubject();
        String email = (String) subject.getPrincipal();
        return userService.findByEmail(email);
    }

    @PostMapping("/upload")
    public @ResponseBody
    String upload(@RequestParam("avatar") MultipartFile file) {
        Subject subject = SecurityUtils.getSubject();
        String email = (String) subject.getPrincipal();
        //得到上传时的文件名字
        String originalname = file.getOriginalFilename();
        //substring(originalname.lastIndexOf(".")截取图片名后缀
        String newName = email + originalname.substring(originalname.lastIndexOf("."));
        String path = null;
        try {
            path = ResourceUtils.getURL("classpath:").getPath() + "static/head_image";
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        String realPath = path.replace('/', '/').substring(1, path.length());
        File newFile = new File(realPath, newName);
        log.info(newFile.getPath());
        if (!newFile.getParentFile().exists()) {
            //如果path路径不存在，创建一个文件夹，存在则使用当前文件夹
            newFile.getParentFile().mkdirs();
        }
        try {
            file.transferTo(newFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
        userService.updateImage(email, newName);
        return "success";
    }

    @PostMapping("/updateInfo")
    public @ResponseBody String updateInfo(@RequestBody User user){
        Subject subject = SecurityUtils.getSubject();
        String  email = (String) subject.getPrincipal();
        user.setEmail(email);
        Integer result = 0;
        if (user.getPassword() != null){
            result +=userService.updatePassword(user.getEmail(),user.getPassword());
        }
        result += userService.updateInfo(user);
        return result>0?"success":"error";

    }

    @RequestMapping("/findOther")
    public @ResponseBody User findOther(@RequestParam("id") String id){
        return userService.findById(id);
    }
    @RequestMapping("/test")
    @RequiresRoles(value = {"normal", "admin"}, logical = Logical.OR)
    public String test() {
        return "code";
    }
}
