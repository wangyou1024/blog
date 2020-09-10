package com.wangyou.blog_data.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SonComment {
    private String sId;
    private String cId;
    private String former;
    private String fName;
    private String latter;
    private String lName;
    private String sonContent;
}
