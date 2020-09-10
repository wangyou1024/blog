package com.wangyou.blog_data.dao;

import com.wangyou.blog_data.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserDao {

    Integer save(User user);

    User findByEmail(String email);

    String findSaltByEmail(String email);

    Integer updatePassword(String email, String password);

    Integer updateImage(String email, String image);

    Integer updateInfo(User user);

    User findById(String id);
}
