module.exports = {
  async headers() {
    return [
      {
        source: "/about/",
        headers: [
          {
            key: "X-About-Custom-Header",
            value: "about_header_value",
          },
        ],
      },
      {
        source: "/media/",
        headers: [
          {
            key: "X-Media-Custom-Header",
            value: "media_header_value",
          },
        ],
      },
      {
        source: "/contacts/",
        headers: [
          {
            key: "X-Contacts-Custom-Header",
            value: "contacts_header_value",
          },
        ],
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  i18n: {
    locales: ["en", "ru", "uz", "ae", "fr", "cn", "es"],
    defaultLocale: "en",
  },
  images: {
    domains: ["smartbolla.com"],
  },
};
