### 博客部署
[博客网站](http://blog.baiyou1024.top)
#### 后端部署

* 将项目上传到服务器

* UserController:

  ```java
  public class UserController {
      // 文件上传
      public @ResponseBody
      String upload(@RequestParam("avatar") MultipartFile file) {
              //在linux下把1改为0，表示从根目录开始的路径，即/root/webapp/...
              //在windows下目录为 E:/blog/.. 
              String realPath = path.replace('/', '/').substring(1, path.length());
      }
      // 获取验证码
      public @ResponseBody
      String code(@RequestParam("email") String email, HttpSession session) {
          // ...code
          mimeMessageHelper.setFrom("your eamil");
          // ... code
      }
      // 重置密码
      public @ResponseBody
      String launchResetting(String email) {
          // ...code
          mimeMessageHelper.setFrom("your eamil");
          // ... code
      }
  }
  ```

  

* InfoUtil.BASE_URL：默认为本地，由于项目会部署到tomcat上，url需改为：`host:8080/projectname-version`，即tomcat访问地址以及打包后的名称

* 启动类：剔除内置tomcat，以下为在当前启动内中添加的内容

  ```java
  // 引入
  import org.springframework.boot.builder.SpringApplicationBuilder;
  import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
  
  // 继承
  public class ****Application extends SpringBootServletInitializer{
      // 方法
      @Override
      protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
          return builder.sources(****Application.class);
      }
  }
  
  // ****Application指当前的启动类
  ```

* pom.xml文件

  ```xml
  <!-- 修改打包方式 -->
  <packaging>war</packaging>
  
  <!-- 剔除内置tomcat -->
  <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-tomcat</artifactId>
      <scope>provided</scope>
  </dependency>
  ```

* application.properties：mysql与redis改为服务器配置，context-path改为‘/’，邮箱配置可自行百度修改配置

  ```properties
  # basic
  server.port=8080
  server.servlet.context-path=/blogdata
  spring.application.name=blogdata
  
  # mysql
  spring.datasource.url=jdbc:mysql://localhost:3306/blog?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8&useAffectedRows=true
  spring.datasource.username=root
  spring.datasource.password=******
  
  # redis
  spring.redis.port=6379
  spring.redis.host=0.0.0.0
  spring.redis.database=0
  spring.redis.password=******
  spring.redis.timeout=10000
  
  # I use the qq emial. According to the follow information, you can use qq email server.
  spring.mail.host=smtp.qq.com
  spring.mail.port=465
  spring.mail.username=your email
  # When you open qq email server, you can get the password. You can not use the password to sign up.
  spring.mail.password=**********
  spring.mail.protocol=smtps
  spring.mail.properties.mail.debug=true
  spring.mail.properties.smtp.auth=true
  spring.mail.properties.smtp.ssl.enable=true
  ```

* 在服务器建立数据库

* 进入后端项目，执行命令

  ```shell
  # clean the dependence
  mvn clean
  # package the project
  mvn package
  # enter tomcat
  cd /usr/local/tomcat/tomcat/apache-tomcat-8.5.55/webapps
  # copy the project's package to tomcat
  cp /root/webapp/blog/blog_data/target/blog_data-*version*.war ./
  ```
  
  
  
  

#### 前台部署

* 发送到服务器

* static/achieveCSS/edit.css/.content11-wrapper/background-url：默认为本地，改为服务器域名及端口

* components/achieve/util.js/imgUrl：默认为本地，改为服务器域名及端口

* components/achieve/data.source.js：个人成就的具体内容，根据实际情况更改

* components/util.js：默认为开发时的本地后端地址，更改为部署后的地址

* 打包部署

  ```npm
  npm install --unsafe-perm --registry=https://registry.npm.taobao.org
  ```

* package.json

  ```json
  {
      "name":"my-app",
      "dependencies":{
          "next":"latest"
      },
      "scripts":{
          "dev":"next",
          "start":"next start -p $PORT",
          "build":"next build && PORT=3001 npm start"
      }
  }
  ```

* pm2启动进程：`pm2 start npm --name "my-next" -- run build`

* 使用nginx代理

  ```ngin
  server {
          listen    80;
          server_name    blog.baiyou1024.top;
          location  /  {
                  proxy_pass    http://127.0.0.1:3001;        
          }
  }
  ```

* 重启nginx

  ```sh
  ps -ef|grep nginx
  nginx reload
  ```

  

  

