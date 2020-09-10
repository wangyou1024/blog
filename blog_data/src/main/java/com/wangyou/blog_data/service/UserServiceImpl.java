package com.wangyou.blog_data.service;

import com.wangyou.blog_data.dao.UserDao;
import com.wangyou.blog_data.entity.User;
import com.wangyou.blog_data.utils.InfoUtil;
import com.wangyou.blog_data.utils.SaltUtils;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Autowired
    private RedisTemplate redisTemplate;

    @Override
    public Integer register(User user) {
        // get the salt for password
        String salt = SaltUtils.getSalt(4);
        user.setSalt(salt);
        Md5Hash md5Hash = new Md5Hash(user.getPassword(), salt, 1024);
        user.setPassword(md5Hash.toHex());
        // set id
        Instant now = Instant.now().plusMillis(TimeUnit.HOURS.toMillis(8));
        user.setUId(now.toEpochMilli() + "");
        return userDao.save(user);
    }

    @Override
    public User findByEmail(String email) {
        return userDao.findByEmail(email);
    }

    @Override
    public String findSaltByEmail(String email) {
        return userDao.findSaltByEmail(email);
    }

    @Override
    public Integer resettingPassword(String email, String salt) {
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashKeySerializer(new StringRedisSerializer());
        redisTemplate.opsForHash().delete("authentication",email);
        redisTemplate.opsForHash().delete("com.wangyou.blog_data.shiro.realms.CustomerRealm.authorizationCache",email);
        String realSalt = userDao.findSaltByEmail(email);
        if (realSalt.equals(salt)) {
            Md5Hash md5Hash = new Md5Hash("123456", salt, 1024);
            String newPassword = md5Hash.toHex();
            return userDao.updatePassword(email, newPassword);
        } else {
            return -1;
        }
    }



    @Override
    public Integer updateImage(String email, String image) {
        return userDao.updateImage(email,InfoUtil.BASE_URL+"/head_image/"+image);
    }

    @Override
    public Integer updateInfo(User user) {
        return userDao.updateInfo(user);
    }

    @Override
    public Integer updatePassword(String email, String password) {
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashKeySerializer(new StringRedisSerializer());
        redisTemplate.opsForHash().delete("authentication",email);
        redisTemplate.opsForHash().delete("com.wangyou.blog_data.shiro.realms.CustomerRealm.authorizationCache",email);
        String realSalt = userDao.findSaltByEmail(email);
        Md5Hash md5Hash = new Md5Hash(password, realSalt, 1024);
        String newPassword = md5Hash.toHex();
            return userDao.updatePassword(email, newPassword);
    }

    @Override
    public User findById(String id) {
        User user = userDao.findById(id);
        user.setPassword(null);
        user.setSalt(null);
        user.setRole(null);
        return user;
    }

}
