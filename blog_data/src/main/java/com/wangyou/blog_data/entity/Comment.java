package com.wangyou.blog_data.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Comment {
    private String cId;
    private String aId;
    private String uId;
    private String image;
    private String name;
    private String content;
    private List<SonComment> list;
}
