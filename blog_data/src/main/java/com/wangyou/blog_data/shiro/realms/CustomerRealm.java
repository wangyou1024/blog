package com.wangyou.blog_data.shiro.realms;

import com.wangyou.blog_data.dao.UserDao;
import com.wangyou.blog_data.entity.User;
import com.wangyou.blog_data.service.UserService;
import com.wangyou.blog_data.shiro.salt.MyByteSource;
import com.wangyou.blog_data.utils.ApplicationContextUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ObjectUtils;

public class CustomerRealm extends AuthorizingRealm {

    @Autowired
    private UserService userService;

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
//         UserService userService = (UserService) ApplicationContextUtils.getBean("userService");
        String primaryPrincipal = (String) principalCollection.getPrimaryPrincipal();
        System.out.println("==========授权==========");
        System.out.println("email:"+primaryPrincipal);
        User user = userService.findByEmail(primaryPrincipal);
        System.out.println("role:"+user.getRole());
        SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
        simpleAuthorizationInfo.addRole(user.getRole());
        return simpleAuthorizationInfo;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
//         UserService userService = (UserService) ApplicationContextUtils.getBean("userService");
        System.out.println("=========认证==========");
        String principal = (String) authenticationToken.getPrincipal();
        System.out.println("email:" + principal);
        User user = userService.findByEmail(principal);
        if (!ObjectUtils.isEmpty(user)) {
            return new SimpleAuthenticationInfo(user.getEmail(),
                    user.getPassword(), new MyByteSource(user.getSalt()), this.getName());
        }
        return null;
    }
}
