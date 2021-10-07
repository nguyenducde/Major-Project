window.env = {
    domain: 'mas',
    core: 'TTL',
    domainGrantType: 'password',
    redirect: 'login',
    companyInfo: {
      mas: {
        socialUrl: 'https://www.facebook.com/chungkhoanMiraeAsset/',
        masChamUrl: 'https://mascham.masvn.com?utm_source=mastrade&utm_medium=header',
        hyperlink: {
          userGuide: {
            vi: 'https://masvn.com/api/attachment/file/1620961881359-Mirae_Asset_Huong_Dan_Su_Dung_Mastrade.pdf',
            en: 'https://masvn.com/api/attachment/file/1620961896093-Mirae_Asset_Mastrade_User_Guide.pdf',
            ko: 'https://masvn.com/api/attachment/file/1620961896093-Mirae_Asset_Mastrade_User_Guide.pdf',
          },
          forgotPassword: {
            vi: 'https://wts.masvn.com/home/account/resetpassword.do',
            en: 'https://wts.masvn.com/home/account/resetpassword.do',
            ko: 'https://wts.masvn.com/home/account/resetpassword.do',
          },
          openAccount: {
            vi: 'https://www.masvn.com/register',
            en: 'https://www.masvn.com/en/register',
            ko: 'https://www.masvn.com/en/register',
          },
          support: {
            vi: 'https://www.masvn.com/cate/trung-tam-ho-tro-6',
            en: 'https://www.masvn.com/en/cate/support-center-6',
            ko: 'https://www.masvn.com/en/cate/support-center-6',
          },
          privacyPolicy: {
            vi: 'https://www.masvn.com/cate/bao-mat-thong-tin-1202',
            en: 'https://www.masvn.com/en/cate/privacy-policy-1202',
            ko: 'https://www.masvn.com/en/cate/privacy-policy-1202',
          },
          termsOfUse: {
            vi: 'https://www.masvn.com/cate/dieu-khoan-su-dung-1203',
            en: 'https://www.masvn.com/en/cate/terms-of-use-1203',
            ko: 'https://www.masvn.com/en/cate/terms-of-use-1203',
          },
        },
      },
    },
    apiUrl: {
      baseURI: '/api/v2/',
      sockets: {
        priceBoard: {
          hostname: 'testprice.masvn.com',
          path: '/ws/socketcluster/',
          port: 443,
          secure: true,
          authTokenName: 'test.priceboard.sctoken',
        },
        wts: {
          hostname: 'testwts.masvn.com',
          path: '/ws/socketcluster/',
          port: 443,
          secure: true,
          ackTimeout: 180000,
          authTokenName: 'test.wts.sctoken',
          authEngineOptions: { useCookie: true, cookieDomain: '' },
        },
        mobileServer: {
          hostname: 'testhp.masvn.com',
          secure: true,
          path: '/ws/socketcluster/',
          ackTimeout: 60000,
          port: 443,
        },
      },
    },
    fetchCount: 40,
    oneSignalAppId: 'a3cc6bb8-6598-4661-8956-c1d486af7461',
    symbolURL: 'https://testprice.masvn.com/files/resources/symbol_static_data.json',
    bankInfoURL: "https://testwts.masvn.com/files/resources/bank_info_data.json",
    rest: {
      baseUri: {
        priceBoard: 'https://testprice.masvn.com/rest',
        wts: 'https://testwts.masvn.com/rest',
        ttl: 'https://testwts.masvn.com/restttl',
        mobileServer: 'https://testhp.masvn.com/tr',
      },
    },
    languages: [
      {
        files: [
          { namespace: 'tuxedo', url: './i18n/viTuxedo.json' },
          { namespace: 'message', url: './i18n/viMessage.json' },
        ],
        msName: 'common',
        lang: 'vi',
        latestVersion: '1.0',
      },
      {
        files: [
          { namespace: 'tuxedo', url: './i18n/enTuxedo.json' },
          { namespace: 'message', url: './i18n/enMessage.json' },
        ],
        msName: 'common',
        lang: 'en',
        latestVersion: '1.0',
      },
      { files: [{ namespace: 'common', url: './i18n/viCommon.json' }], msName: 'wts', lang: 'vi', latestVersion: '1.0' },
      { files: [{ namespace: 'common', url: './i18n/enCommon.json' }], msName: 'wts', lang: 'en', latestVersion: '1.0' },
      { files: [{ namespace: 'common', url: './i18n/koCommon.json' }], msName: 'wts', lang: 'ko', latestVersion: '1.0' },
      { files: [{ namespace: 'common', url: './i18n/zhCommon.json' }], msName: 'wts', lang: 'zh', latestVersion: '1.0' },
    ],
  };
  