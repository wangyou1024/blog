package com.wangyou.blog_data.config;

import com.wangyou.blog_data.shiro.cache.RedisCacheManager;
import com.wangyou.blog_data.shiro.realms.CustomerRealm;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class ShiroConfig {

    /**
     * create shiroFilter
     * @param defaultWebSecurityManager
     * @return
     */
    @Bean
    public ShiroFilterFactoryBean getShiroFilterFactoryBean(DefaultWebSecurityManager defaultWebSecurityManager){
        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();

        // set securityManage
        shiroFilterFactoryBean.setSecurityManager(defaultWebSecurityManager);

        // set the limit resource
        Map<String,String> map = new HashMap<String, String>();
        map.put("/templates/**","anon");
        map.put("/user/*","anon");
        map.put("/article/*","anon");
        map.put("/article_image/**","anon");
        map.put("/comment/findComment","anon");
//        map.put("/comment/*","anon");
        map.put("/head_image/**","anon");
//        map.put("/user/getSelf","authc");
        map.put("/**","authc");
        shiroFilterFactoryBean.setFilterChainDefinitionMap(map);
        // if you can't something, you will enter the follow url
        shiroFilterFactoryBean.setLoginUrl("/user/limit");
        return shiroFilterFactoryBean;
    }

    /**
     * create securityManager
     * @param realm
     * @return
     */
    @Bean
    public DefaultWebSecurityManager getSecurityManager(Realm realm){
        DefaultWebSecurityManager defaultWebSecurityManager = new DefaultWebSecurityManager();
        defaultWebSecurityManager.setRealm(realm);
        return defaultWebSecurityManager;
    }

    /**
     * configure realm
     * @return
     */
    @Bean
    public Realm getRealm(){
        CustomerRealm customerRealm = new CustomerRealm();

        // edit the match
        HashedCredentialsMatcher credentialsMatcher = new HashedCredentialsMatcher();
        credentialsMatcher.setHashAlgorithmName("MD5");
        credentialsMatcher.setHashIterations(1024);
        customerRealm.setCredentialsMatcher(credentialsMatcher);

        // open the cache manager
        customerRealm.setCacheManager(new RedisCacheManager());
        // open the global cache
        customerRealm.setCachingEnabled(true);
        // set authentication cache
        customerRealm.setAuthenticationCachingEnabled(true);
        customerRealm.setAuthenticationCacheName("authentication");
        // set authorization cache
        customerRealm.setAuthorizationCachingEnabled(true);
        customerRealm.setAuthorizationCacheName("authorization");

        return customerRealm;
    }
}
