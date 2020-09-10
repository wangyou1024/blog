package com.wangyou.blog_data.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Article {
    private String aId;
    private String title;
    private Integer view;
    private Integer message;
    private String articleDate;
    private String articleImage;
    private String articleIntroduce;
    private String detail;

}
