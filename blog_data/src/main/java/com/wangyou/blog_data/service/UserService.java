package com.wangyou.blog_data.service;

import com.wangyou.blog_data.entity.User;

public interface UserService {

    /**
     * register someone
     * @param user
     * @return
     */
    Integer register(User user);

    /**
     * @param email
     * @return
     */
    User findByEmail(String email);

    String findSaltByEmail(String email);

    Integer resettingPassword(String email,String salt);

    Integer updateImage(String email, String image);

    Integer updateInfo(User user);

    Integer updatePassword(String email, String password);

    User findById(String id);
}
