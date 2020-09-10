package com.wangyou.blog_data.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class User {
    private String uId;
    private String uName;
    private String email;
    private String password;
    private String sex;
    private String role;
    private String headImage;
    private String userIntroduce;
    private String salt;
}
