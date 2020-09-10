import React from 'react';
import {imgUrl} from "./utils";
import Link from "next/link";
export const Content110DataSource = {
  OverPack: {
    className: 'home-page-wrapper content11-wrapper',
    playScale: 0.3,
  },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'image',
        children:
          // 'https://gw.alipayobjects.com/zos/rmsportal/PiqyziYmvbgAudYfhuBr.svg',
        // https://www.manypixels.co/gallery/?color=57ddfb&page=1&s=University
        imgUrl+"/diversity_.svg",
        className: 'title-image',
      },
      {
        name: 'title',
        children: (
          <span>
            <p>精彩的大学生活</p>
          </span>
        ),
        className: 'title-h1',
      },
      {
        name: 'content',
        children: (
          <span>
            <p>课程、社团、实验室一个不落</p>
          </span>
        ),
        className: 'title-content',
      },
      {
        name: 'content2',
        children: (
          <span>
            <p>追逐曾经的梦</p>
          </span>
        ),
        className: 'title-content',
      },
    ],
  },
  // button: {
  //   className: '',
  //   children: { a: { className: 'button', href: '#', children: '立即报名' } },
  // },
};
export const Feature50DataSource = {
  wrapper: { className: 'home-page-wrapper content7-wrapper' },
  page: { className: 'home-page content7' },
  OverPack: {},
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'title',
        children: '大学个人作品集',
        className: 'title-h1',
      },
      { name: 'content', children: '基于软件工程相关知识' },
    ],
  },
  tabsWrapper: { className: 'content7-tabs-wrapper' },
  block: {
    children: [
      {
        name: 'block0',
        tag: {
          className: 'content7-tag',
          text: { children: '云课堂', className: 'content7-tag-name' },
          icon: { children: 'mobile' },
        },
        content: {
          className: 'content7-content',
          text: {
            className: 'content7-text',
            md: 14,
            xs: 24,
            children: (
              <span>
                <h3>开发背景</h3>
                <p>
                  该项目由《软件工程与计算II》课程组老师提出，以小组团队形式设计、开发基于数据库的中等规模的软件，
                  初步树立学生软件开发的团队协作意识，培养学生数据库及其软件开发基本能力，
                  了解软件的需求分析、设计、实现、评审和测试。
                </p>
                <br />
                <h3>技术</h3>
                <p>
                  该作品使用了<a href={"https://nextjs.frontendx.cn/"}>Next</a>+
                  <a href={"https://spring.io/projects/spring-boot"}>SpringBoot</a>框架，
                  其中的组件采用了<a href={"https://ant.design/index-cn"}>Ant Design</a>提供的组件集，
                  同时还融入了<a href={"https://baike.baidu.com/item/markdown/3245829?fr=aladdin"}>markdown</a>
                  语法与<a href={"https://baike.baidu.com/item/MD5/212708?fr=aladdin"}>MD5</a>加密方式。代码存放与
                  <a href={"https://github.com/wangyou1024/cloudClass"}>cloudClass仓库</a>。
                </p>
                <br />
                <h3>
                  体验
                </h3>
                <p>网址：<a href={"http://cloudclass.baiyou1024.top/"}>云课堂</a></p>
                <p>体验账号：15923093716（老师）、18375891382（学生）</p>
                <p>密码：15923093716（老师）、18375891382（学生）</p>
              </span>
            ),
          },
          img: {
            className: 'content7-img',
            children:
              imgUrl+"/cloudclass.svg",
              // 'https://zos.alipayobjects.com/rmsportal/xBrUaDROgtFBRRL.png',
            md: 10,
            xs: 24,
          },
        },
      },
      {
        name: 'block1',
        tag: {
          className: 'content7-tag',
          icon: { children: 'tablet' },
          text: { className: 'content7-tag-name', children: '个人博客' },
        },
        content: {
          className: 'content7-content',
          text: {
            className: 'content7-text',
            md: 14,
            xs: 24,
            children: (
              <span>
                <h3>开发背景</h3>
                <p>
                  大二结束的暑假里，系统地学习了一些东西，通过一个个人博客来进行实际操作，同时记录下平时学习的心得。
                </p>
                <br />
                <h3>技术</h3>
                <p>
                  该作品依然使用了<a href={"https://nextjs.frontendx.cn/"}>Next</a>、
                  <a href={"https://spring.io/projects/spring-boot"}>SpringBoot</a>、
                  <a href={"https://ant.design/index-cn"}>Ant Design</a>提供的组件集，同时在SpringBoot中集成了
                  <a href={"http://shiro.apache.org/"}>shiro</a>、
                  <a href={"https://mybatis.org/mybatis-3/zh/index.html"}>Mybatis</a>、
                  <a href={"https://redis.io/"}>Redis</a>、
                  <a href={"https://www.thymeleaf.org/"}>thymeleaf</a>
                  等内容,而前端项目中集成了
                  <a href={"https://www.redux.org.cn/"} >Redux</a>
                  。其中的动效来自
                  <a href={"https://motion.ant.design/index-cn"}>Motion Design</a>，
                  在<a href={"https://landing.ant.design/index-cn"}>Ant Design Landing 平台</a>的在线编辑器完成基本编辑，
                  在本地完善。博客中的插图主要来自<a href={"https://undraw.co/"}>undraw</a>、
                  <a href={"https://www.manypixels.co/gallery/"}>manypixels</a>、
                  <a href={"https://icons8.com/vector-creator"}>vector-creator</a>。
                </p>
                <br />
                <p>网址：<Link href={"/"}><a>博客首页</a></Link></p>
              </span>
            ),
          },
          img: {
            className: 'content7-img',
            md: 10,
            xs: 24,
            children:
              // 'https://zos.alipayobjects.com/rmsportal/xBrUaDROgtFBRRL.png',
            imgUrl+'/blog.svg',
          },
        },
      },
/*      {
        name: 'block2',
        tag: {
          className: 'content7-tag',
          text: { children: 'DESKTOP', className: 'content7-tag-name' },
          icon: { children: 'laptop' },
        },
        content: {
          className: 'content7-content',
          text: {
            className: 'content7-text',
            md: 14,
            xs: 24,
            children: (
              <span>
                <h3>技术</h3>
                <p>
                  丰富的技术组件，简单组装即可快速搭建金融级应用，丰富的技术组件，简单组装即可快速搭建金融级应用。
                </p>
                <br />
                <h3>融合</h3>
                <p>
                  解放业务及技术生产力，推动金融服务底层创新，推动金融服务底层创新。解放业务及技术生产力，推动金融服务底层创新。
                </p>
                <br />
                <h3>
                  开放
                </h3>符合金融及要求的安全可靠、高可用、高性能的服务能力，符合金融及要求的安全可靠、高可用、高性能的服务能力。
              </span>
            ),
          },
          img: {
            className: 'content7-img',
            md: 10,
            xs: 24,
            children:
              'https://zos.alipayobjects.com/rmsportal/xBrUaDROgtFBRRL.png',
          },
        },
      },*/
    ],
  },
};
export const Content90DataSource = {
  wrapper: { className: 'home-page-wrapper content9-wrapper' },
  page: { className: 'home-page content9' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'image',
        children:
          // 'https://gw.alipayobjects.com/zos/rmsportal/PiqyziYmvbgAudYfhuBr.svg',
        imgUrl+"/collegeCap.svg",
        className: 'title-image',
      },
      { name: 'title', children: '四个春秋', className: 'title-h1' },
    ],
  },
  block: {
    className: 'timeline',
    children: [
      {
        name: 'block0',
        className: 'block-wrapper',
        playScale: 0.3,
        children: {
          imgWrapper: { className: 'image-wrapper' },
          textWrapper: { className: 'text-wrapper' },
          img: {
            className: 'block-img',
            children:
            imgUrl+"/new_message.svg",
              // 'https://gw.alipayobjects.com/zos/rmsportal/SlFgHDtOTLzccvFrQHLg.png',
          },
          icon: {
            className: 'block-icon',
            children:
              // 'https://gw.alipayobjects.com/zos/rmsportal/qJnGrvjXPxdKETlVSrbe.svg',
            imgUrl+"/rectangle.svg",
          },
          name: { className: 'block-name', children: '大一' },
          post: { className: 'block-post', children: '好奇 蒙昧' },
          time: { className: 'block-time', children: '2018-2019' },
          title: { className: 'block-title', children: '初出茅庐' },
          content: { className: 'block-content', children: '新的环境总是令人兴奋，认识新的朋友，' +
                '游览各个景点，竞选班干部，加入社团，参加冬令营、夏令营，最幸运的是学着自己喜欢的专业，一切都如期待的那样。' +
                '这一学年获得了优秀学生干部，奖学金，当然，最重要的是了解了专业，从蒙昧中蜕变。' },
        },
      },
      {
        name: 'block1',
        className: 'block-wrapper',
        playScale: 0.3,
        children: {
          imgWrapper: { className: 'image-wrapper' },
          textWrapper: { className: 'text-wrapper' },
          img: {
            className: 'block-img',
            children:
                imgUrl+"/collegeFun.svg",
            // 'https://gw.alipayobjects.com/zos/rmsportal/SlFgHDtOTLzccvFrQHLg.png',
          },
          icon: {
            className: 'block-icon',
            children:
              // 'https://gw.alipayobjects.com/zos/rmsportal/QviGtUPvTFxdhsTUAacr.svg',
            imgUrl+"/triangle.svg",
          },
          name: { className: 'block-name', children: '大二' },
          post: { className: 'block-post', children: '忙碌 迷茫' },
          time: { className: 'block-time', children: '2019-2020' },
          title: { className: 'block-title', children: '小有成就' },
          content: {
            className: 'block-content',
            children:
              '这一学年，我尝试建立社团，加入实验室，当然，课程才是主要的，相比与大一的基础课程，' +
                '这一学年是专业的核心，数据结构、计算机网络、高级java、数据库设计原理、操作系统等课程接踵而至。' +
                '一年的忙碌总归还是有所收获，比如与同学完成一中等规模的软件、一个个人博客，最重要的是明确的发展方向。',
          },
        },
      },
      {
        name: 'block2',
        className: 'block-wrapper',
        playScale: 0.3,
        children: {
          imgWrapper: { className: 'image-wrapper' },
          textWrapper: { className: 'text-wrapper' },
          img: {
            className: 'block-img',
            children:
            imgUrl+"/code_review.svg",
              // 'https://gw.alipayobjects.com/zos/rmsportal/SlFgHDtOTLzccvFrQHLg.png',
          },
          icon: {
            className: 'block-icon',
            children:
              // 'https://gw.alipayobjects.com/zos/rmsportal/QviGtUPvTFxdhsTUAacr.svg',
            imgUrl+"/triangle.svg",
          },
          name: { className: 'block-name', children: '大三' },
          post: { className: 'block-post', children: '专注 奋斗' },
          time: { className: 'block-time', children: '2020-2021' },
          title: { className: 'block-title', children: '游刃有余' },
          content: {
            className: 'block-content',
            children:
              '未来可期',
          },
        },
      },
      {
        name: 'block3',
        className: 'block-wrapper',
        playScale: 0.3,
        children: {
          imgWrapper: { className: 'image-wrapper' },
          textWrapper: { className: 'text-wrapper' },
          img: {
            className: 'block-img',
            children:
            imgUrl+"/stand_out.svg",
              // 'https://gw.alipayobjects.com/zos/rmsportal/SlFgHDtOTLzccvFrQHLg.png',
          },
          icon: {
            className: 'block-icon',
            children:
              // 'https://gw.alipayobjects.com/zos/rmsportal/agOOBdKEIJlQhfeYhHJc.svg',
            imgUrl+"/circle.svg",
          },
          name: { className: 'block-name', children: '大四' },
          post: { className: 'block-post', children: '睁眼 赋能' },
          time: { className: 'block-time', children: '2021-2022' },
          title: { className: 'block-title', children: '大显身手' },
          content: {
            className: 'block-content',
            children:
              '未来可期',
          },
        },
      },
    ],
  },
};
export const Teams00DataSource = {
  wrapper: { className: 'home-page-wrapper teams0-wrapper' },
  OverPack: { playScale: 0.3, className: 'home-page teams0' },
  BannerAnim: {
    className: 'banner-anim',
    children: [
      {
        name: 'elem0',
        className: 'teams0-banner-user-elem',
        titleWrapper: {
          className: 'teams0-content-wrapper',
          children: [
            {
              name: 'image',
              children:
                // 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*njqxS5Ky7CQAAAAAAAAAAABjARQnAQ',
              imgUrl+"/liuyong.jpg",
              className: 'teams0-image',
            },
            {
              name: 'content',
              children:
                '衣带渐宽终不悔，为伊消得人憔悴。',
              className: 'teams0-content',
            },
            { name: 'title', children: '柳永', className: 'teams0-h1' },
            {
              name: 'content2',
              children: '宋代著名诗人',
              className: 'teams0-content',
            },
          ],
        },
      },
      {
        name: 'elem1',
        className: 'teams0-banner-user-elem',
        titleWrapper: {
          className: 'teams0-content-wrapper',
          children: [
            {
              name: 'image',
              children:
                // 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*--rVR4hclJYAAAAAAAAAAABjARQnAQ',
              imgUrl+"/selfcontrol.jpg",
              className: 'teams0-image',
            },
            {
              name: 'content',
              children:
                'Self control is the strongest instinct.——自我控制是最强者的本能',
              className: 'teams0-content',
            },
            { name: 'title', children: '萧伯纳', className: 'teams0-h1' },
            {
              name: 'content2',
              children: '英国剧作家、政论家',
              className: 'teams0-content',
            },
          ],
        },
      },
    ],
  },
};
export const Footer20DataSource = {
  wrapper: { className: 'home-page-wrapper footer2-wrapper' },
  OverPack: {
    className: 'home-page footer2 kdjz2jxo706-editor_css',
    playScale: 0.05,
  },
  copyright: {
    className: 'copyright',
    children: [
      // {
      //   name: 'image',
      //   children:
      //     'https://gw.alipayobjects.com/zos/rmsportal/NuuAwJBxewWglRSoNjET.png',
      //   className: 'copyright-logo',
      // },
      // {
      //   name: 'group',
      //   children: '蚂蚁金服体验科技大会',
      //   className: 'copyright-group',
      // },
      // {
      //   name: 'image2',
      //   children:
      //     'https://gw.alipayobjects.com/zos/rmsportal/fgGmQUfiUfSBfvsQpfOj.svg',
      //   className: 'copyright-line',
      // },
      {
        name: 'image',
        children:
          imgUrl+'/email.svg',
        className: 'copyright-logo',
      },
      {
        name: 'copyright',
        // children: 'Copyright © baiyou1024@qq.com',
        children: 'baiyou1024@qq.com',
        className: 'copyright-text',
      },
    ],
  },
  links: {
    className: 'links',
    children: [
      // {
      //   name: 'weibo',
      //   href: '#',
      //   className: 'links-weibo',
      //   children:
      //   imgUrl+"/weibo.svg",
      // },
      // {
      //   name: 'zhihu',
      //   href: '#',
      //   className: 'links-zhihu',
      //   children:
      //     imgUrl+"/zhihu.svg",
      // },
      {
        name: 'github',
        href: "https://github.com/wangyou1024",
        className: 'links-weibo',
        children:
          imgUrl+"/github.svg",
      },
      {
        name: 'leetcode',
        href: "https://leetcode-cn.com/u/wangyou1024/",
        className: 'links-weibo',
        children:
            imgUrl+"/leetcode.svg",
      },
    ],
  },
};
