/*
 * grunt-marsRev
 * https://github.com/tdp100/grunt-marsRev
 *
 * Copyright (c) 2015 tangdeping
 * Licensed under the MIT license.
 */
/* global require */
/* global module */
/* jshint -W097 */
'use strict';
var fs = require('fs');
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        //css array
        supportLanguage: {
            "default": ['zh-cn', 'en-us'],
            "hws": ['zh-cn', 'en-us'],
            "ctc": ['zh-cn'],
            "dt": ['en-us'],
            "ocb": ['en-us','fr-fr'],
            "tlf-chile": ['en-us', 'es-es', 'pt-br'],
            "tlf-argent": ['en-us', 'es-es', 'pt-br'],
            "tlf-mexico": ['en-us', 'es-es', 'pt-br'],
            "tlf-usa": ['en-us', 'es-es', 'pt-br'],
            "tlf-peru": ['en-us', 'es-es', 'pt-br'],
            "tlf-spain": ['en-us', 'es-es', 'pt-br'],
            "tlf-vivo": ['en-us', 'es-es', 'pt-br']
        },
        languageMapping: [
            ["zh-cn", "['zh-cn', '中文（简体）']"],
            ["en-us", "['en-us', 'English']"],
            ["de-de", "['de-de', 'Deutsch']"],
            ["pt-br", "['pt-br', 'Português']"],
            ["es-es", "['es-es', 'Español']"],
            ["fr-fr", "['fr-fr', 'Français']"]
        ],
        cookieShareDomain: {
            "default": "hwclouds.com",
            "ctc": "ctyun.cn",
            "dt": "t-systems.com",
            "ocb": "ocbcloud.com",               /*ocb link*/
            "tlf-chile": "openmovistarcloud.cl",
            "tlf-argent": "opencloud.movistar.com.ar",
            "tlf-mexico": "openmovistarcloud.com.mx",
            "tlf-usa": "opencloud.us.telefonica.com",
            "tlf-peru": "opencloud.telefonica.com.pe",
            "tlf-spain": "opencloud.telefonica.com",
            "tlf-vivo": "vivocloudopen.com.br"
        },

        cssResources: [],
        remoteResource: {
            staticResourceServer: "/static/",
            frameResourceDir: "framework"
        },
        //清空build
        clean: {
            build: ['build']
        },
        //js语法检查
        jshint: {
            app: {
                files: {src: ['browserChecker.js', 'main.js', 'urlDeal.js', 'src/app/**/*.js', 'i18n/**/*.js', '!i18n/**/widgetsLanguage.js']},
                options: {jshintrc: '.jshintrc'}
            }
        },

        //复制
        copy: {
            main: {
                files: [
                    {
                        cwd: "theme/default/",
                        src: ['**', '!less/**', '!**/*.css'],
                        dest: 'build/theme/default',
                        expand: true
                    },
                    {
                        cwd: "theme/default/",
                        src: ['css/framework.customization.css', 'css/bootstrap.min.css'],
                        dest: 'build/theme/default',
                        expand: true
                    },
                    {src: ['lib/**', '!lib/tiny/tiny*-all.js'], dest: 'build/', expand: true},
                    {src: ['src/**', '!src/app/framework/localization/**'], dest: 'build/', expand: true},
                    {cwd: 'theme/tiny-extra/images/', src: ['**'], dest: 'build/theme/default/images/', expand: true},
                    {src: 'urlDeal.js', dest: 'build/', expand: true},
                    {src: 'browserChecker.js', dest: 'build/', expand: true},
					{cwd: 'theme/tiny2/css/', src: 'tiny.min.css', dest: 'build/theme/tiny2/css/', expand: true},
					{src: 'theme/tiny2/fonts/**', dest: 'build/', expand: true},
					{src: 'theme/tiny2/img/**', dest: 'build/', expand: true}
                ]
            },
            default: {
                files: [
                    {cwd: "i18n/default/", src: ['zh-cn/**', 'en-us/**'], dest: 'build/i18n/default/', expand: true},
                    {src: ['src/app/framework/localization/*.js'], dest: 'build/', expand: true}
                ]
            },
            hws: {
                files: [
                    {cwd: "i18n/default/", src: ['zh-cn/**', 'en-us/**'], dest: 'build/i18n/default/', expand: true},
                    {cwd: "i18n/hws/", src: ['zh-cn/**', 'en-us/**'], dest: 'build/i18n/default/', expand: true},
                    {
                        cwd: "theme/hws/",
                        src: ['**', '!less/**', '!**/*.css'],
                        dest: 'build/theme/default',
                        expand: true
                    },
                    {
                        cwd: "src/app/framework/localization/hws",
                        src: ['**'],
                        dest: 'build/src/app/framework/localization/',
                        expand: true
                    },
                    {src: 'lib/analysis.js', dest: 'build/', expand: true}
                ]
            },
            "tlf-chile": {
                files: [
                    {
                        cwd: "i18n/default/",
                        src: ['zh-cn/**', 'en-us/**', 'pt-br/**', 'es-es/**'],
                        dest: 'build/i18n/default/',
                        expand: true
                    },
                    {
                        cwd: "theme/tlf-mov/",
                        src: ['**', '!less/**', '!**/*.css'],
                        dest: 'build/theme/default',
                        expand: true
                    },
                    {cwd: "i18n/tlf-chile/", src: ['**'], dest: 'build/i18n/default/', expand: true},
                    {
                        cwd: "src/app/framework/localization/tlf-chile",
                        src: ['**'],
                        dest: 'build/src/app/framework/localization/',
                        expand: true
                    }
                ]
            },
            "tlf-argent": {
                files: [
                    {
                        cwd: "i18n/default/",
                        src: ['zh-cn/**', 'en-us/**', 'pt-br/**', 'es-es/**'],
                        dest: 'build/i18n/default/',
                        expand: true
                    },
                    {
                        cwd: "theme/tlf-mov/",
                        src: ['**', '!less/**', '!**/*.css'],
                        dest: 'build/theme/default',
                        expand: true
                    },
                    {cwd: "i18n/tlf-argent/", src: ['**'], dest: 'build/i18n/default/', expand: true},
                    {
                        cwd: "src/app/framework/localization/tlf-argent",
                        src: ['**'],
                        dest: 'build/src/app/framework/localization/',
                        expand: true
                    }
                ]
            },
            "tlf-spain": {
                files: [
                    {
                        cwd: "i18n/default/",
                        src: ['zh-cn/framework.common.js', 'en-us/framework.common.js', 'pt-br/framework.common.js', 'es-es/framework.common.js'],
                        dest: 'build/i18n/default/',
                        expand: true
                    },
                    {
                        cwd: "theme/tlf-mov/",
                        src: ['**', '!less/**', '!**/*.css'],
                        dest: 'build/theme/default',
                        expand: true
                    },
                    {cwd: "i18n/tlf-spain/", src: ['**'], dest: 'build/i18n/default/', expand: true},
                    {
                        cwd: "src/app/framework/localization/tlf-spain",
                        src: ['**'],
                        dest: 'build/src/app/framework/localization/',
                        expand: true
                    }
                ]
            },
            "tlf-mexico": {
                files: [
                    {
                        cwd: "i18n/default/",
                        src: ['zh-cn/**', 'en-us/**', 'pt-br/**', 'es-es/**'],
                        dest: 'build/i18n/default/',
                        expand: true
                    },
                    {
                        cwd: "theme/tlf-mov/",
                        src: ['**', '!less/**', '!**/*.css'],
                        dest: 'build/theme/default',
                        expand: true
                    },
                    {cwd: "i18n/tlf-mexico/", src: ['**'], dest: 'build/i18n/default/', expand: true},
                    {
                        cwd: "src/app/framework/localization/tlf-mexico",
                        src: ['**'],
                        dest: 'build/src/app/framework/localization/',
                        expand: true
                    }
                ]
            },
            "tlf-usa": {
                files: [
                    {
                        cwd: "i18n/default/",
                        src: ['zh-cn/**', 'en-us/**', 'pt-br/**', 'es-es/**'],
                        dest: 'build/i18n/default/',
                        expand: true
                    },
                    {
                        cwd: "theme/tlf-global/",
                        src: ['**', '!less/**', '!**/*.css'],
                        dest: 'build/theme/default',
                        expand: true
                    },
                    {cwd: "i18n/tlf-usa/", src: ['**'], dest: 'build/i18n/default/', expand: true},
                    {
                        cwd: "src/app/framework/localization/tlf-usa",
                        src: ['**'],
                        dest: 'build/src/app/framework/localization/',
                        expand: true
                    }
                ]
            },
             "tlf-peru": {
                files: [
                    {
                        cwd: "i18n/default/",
                        src: ['zh-cn/framework.common.js', 'en-us/framework.common.js', 'pt-br/framework.common.js', 'es-es/framework.common.js'],
                        dest: 'build/i18n/default/',
                        expand: true
                    },
                    {
                        cwd: "theme/tlf-global/",
                        src: ['**', '!less/**', '!**/*.css'],
                        dest: 'build/theme/default',
                        expand: true
                    },
                    {cwd: "i18n/tlf-peru/", src: ['**'], dest: 'build/i18n/default/', expand: true},
                    {
                        cwd: "src/app/framework/localization/tlf-peru",
                        src: ['**'],
                        dest: 'build/src/app/framework/localization/',
                        expand: true
                    }
                ]
            },
            "tlf-vivo": {
                files: [
                    {
                        cwd: "i18n/default/",
                        src: ['zh-cn/**', 'en-us/**', 'pt-br/**', 'es-es/**'],
                        dest: 'build/i18n/default/',
                        expand: true
                    },
                    {
                        cwd: "theme/tlf-vivo/",
                        src: ['**', '!less/**', '!**/*.css'],
                        dest: 'build/theme/default',
                        expand: true
                    },
                    {cwd: "i18n/tlf-vivo/", src: ['**'], dest: 'build/i18n/default/', expand: true},
                    {
                        cwd: "src/app/framework/localization/tlf-vivo",
                        src: ['**'],
                        dest: 'build/src/app/framework/localization/',
                        expand: true
                    }
                ]
            },
            "ocb": {
                files: [
                    {
                        cwd: "i18n/default/",
                        src: ['en-us/**', 'fr-fr/**'],
                        dest: 'build/i18n/default/',
                        expand: true
                    },
                    {
                        cwd: "theme/ocb/",
                        src: ['**', '!less/**', '!**/*.css'],
                        dest: 'build/theme/default',
                        expand: true
                    },
                    {cwd: "i18n/ocb/", src: ['**'], dest: 'build/i18n/default/', expand: true},
                    {
                        cwd: "src/app/framework/localization/ocb",
                        src: ['**'],
                        dest: 'build/src/app/framework/localization/',
                        expand: true
                    }
                ]
            },

            dt: {
                files: [
                    {
                        cwd: "i18n/default/",
                        src: ['de-de/**', 'en-us/**'],
                        dest: 'build/i18n/default/',
                        expand: true
                    },
                    {cwd: "theme/dt/", src: ['**', '!less/**', '!**/*.css'], dest: 'build/theme/default', expand: true},
                    {cwd: "i18n/dt/", src: ['**'], dest: 'build/i18n/default/', expand: true},
                    {
                        cwd: "src/app/framework/localization/dt",
                        src: ['**'],
                        dest: 'build/src/app/framework/localization/',
                        expand: true
                    }
                ]
            },
            ctc: {
                files: [
                    {
                        cwd: "i18n/default/",
                        src: ['zh-cn/**', 'en-us/**'],
                        dest: 'build/i18n/default/',
                        expand: true
                    },
                    {
                        cwd: "theme/ctc/",
                        src: ['**', '!less/**', '!**/*.css'],
                        dest: 'build/theme/default',
                        expand: true
                    },
                    {cwd: "i18n/ctc/", src: ['**'], dest: 'build/i18n/default/', expand: true},
                    {
                        cwd: "src/app/framework/localization/ctc",
                        src: ['**'],
                        dest: 'build/src/app/framework/localization/',
                        expand: true
                    }
                ]
            },
            fixtures: {
                files: [
                    {cwd: "fixtures/", src: ['**'], dest: 'build/fixtures', expand: true}
                ]
            }
        },

        //搜索要合并的css, 并替换文本
        replace: {
            gather: {
                files: [
                    {
                        dest: 'build/',
                        expand: true,
                        src: ['index.html']
                    }
                ],
                options: {
                    patterns: [
                        {
                            //Grab the <!--business-js-start--> and <!--business-js-end--> comments and everything in-between
                            /* jshint -W049 */
                            match: /\<\!\-\-framework\-css\-start[\s\S]*framework\-css\-end\-\-\>/,
                            replacement: function (matchedString) {
                                //Grab all of the href attributes from the <href> tags
                                var tmpTarget = target;
                                if (target === 'tlf-chile' || target === 'tlf-argent' || target === 'tlf-mexico' || target === 'tlf-spain') {
                                    tmpTarget = 'tlf-mov';
                                }
                                if (target === 'tlf-usa' || target === 'tlf-peru') {
                                    tmpTarget = 'tlf-global';
                                }
                                var regExp = new RegExp('<\\!\\-\\-css\\-' + tmpTarget + '\\-start[\\s\\S]*css\\-' + tmpTarget + '\\-end\\-\\-\\>');
                                var matchArrary = matchedString.match(regExp);
                                if (!matchArrary || matchArrary.length !== 1) {
                                    return matchedString;
                                }
                                var cssArray = matchArrary[0].match(/(href\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/g);
                                if (cssArray) {
                                    cssArray.forEach(function (element) {
                                        var resourceTarget = element.match(/(href\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/)[2];
                                        var spriteTarget = resourceTarget.match(/(.*)(.css)/);
                                        if (spriteTarget !== null) {
                                            var targetConfig = grunt.config('cssResources');
                                            //check sprite css is exist
                                            var spritePath = spriteTarget[1] + "-sprite.css";
                                            var exists = fs.existsSync(spritePath);
                                            //Alter the path for use with the concat task
                                            if (exists) {
                                                //Alter the path for use with the concat task
                                                targetConfig.push(spritePath);
                                            } else {
                                                targetConfig.push(resourceTarget);
                                            }
                                            //Add the path to the CSS file to the cssResources configuration property
                                            grunt.config('cssResources', targetConfig);
                                        }

                                    });
                                    //Replace the entire business-css-start to business-css-end block with this <link> tag
                                    return '<link rel="stylesheet" type="text/css"  href="theme/default/css/combined-framework.min.css"/>';
                                } else {
                                    //Replace the entire business-css-start to business-css-end block with this <link> tag
                                    return '';
                                }
                            }
                        },
                        {
                            //Grab the <!--framework-js-start--> and <!--framework-js-end--> comments and everything in-between
                            match: /\<\!\-\-business\-css\-start[\s\S]*business\-css\-end\-\-\>/,
                            replacement: function () {
                                //Replace the entire business-css-start to business-css-end block with this <link> tag
                                return '';
                            }
                        }
                    ]
                }
            },
            i18n: {
                files: [
                    {
                        cwd: 'build/',
                        dest: 'build/',
                        expand: true,
                        src: ['i18n/default/**/framework.js']
                    }
                ],
                options: {
                    patterns: [
                        {
                            match: /i18n\/default\/.*\/framework.common/,
                            replacement: function () {
                                return "language-remote/framework.common";
                            }
                        }
                    ]
                }
            },
            dt: {
                files: [
                    {
                        dest: 'build/',
                        expand: true,
                        src: ['src/app/framework/views/*.html']
                    }
                ],
                options: {
                    patterns: [
                        {
                            match: /\<\!\-\-menus\-default\-start[\s\S]*menus\-default\-end\-\-\>/,
                            replacement: function () {
                                return "";
                            }
                        }
                    ]
                }
            },

            "tlf-vivo": {
                files: [
                    {
                        dest: 'build/',
                        expand: true,
                        src: ['src/app/framework/views/*.html']
                    }
                ],
                options: {
                    patterns: [
                        {
                            match: /\<\!\-\-menus\-dt\-start[\s\S]*menus\-dt\-end\-\-\>/,
                            replacement: function () {
                                return "";
                            }
                        }
                    ]
                }
            },
            "tlf-chile": {
                files: [
                    {
                        dest: 'build/',
                        expand: true,
                        src: ['src/app/framework/views/*.html']
                    }
                ],
                options: {
                    patterns: [
                        {
                            /* jshint -W049 */
                            match: /\<\!\-\-menus\-dt\-start[\s\S]*menus\-dt\-end\-\-\>/,
                            replacement: function () {
                                return "";
                            }
                        }
                    ]
                }
            },
            "tlf-argent": {
                files: [
                    {
                        dest: 'build/',
                        expand: true,
                        src: ['src/app/framework/views/*.html']
                    }
                ],
                options: {
                    patterns: [
                        {
                            match: /\<\!\-\-menus\-dt\-start[\s\S]*menus\-dt\-end\-\-\>/,
                            replacement: function () {
                                return "";
                            }
                        }
                    ]
                }
            },
            "tlf-mexico": {
                files: [
                    {
                        dest: 'build/',
                        expand: true,
                        src: ['src/app/framework/views/*.html']
                    }
                ],
                options: {
                    patterns: [
                        {
                            match: /\<\!\-\-menus\-dt\-start[\s\S]*menus\-dt\-end\-\-\>/,
                            replacement: function () {
                                return "";
                            }
                        }
                    ]
                }
            },
            "tlf-usa": {
                files: [
                    {
                        dest: 'build/',
                        expand: true,
                        src: ['src/app/framework/views/*.html']
                    }
                ],
                options: {
                    patterns: [
                        {
                            match: /\<\!\-\-menus\-dt\-start[\s\S]*menus\-dt\-end\-\-\>/,
                            replacement: function () {
                                return "";
                            }
                        }
                    ]
                }
            },
            "tlf-peru": {
                files: [
                    {
                        dest: 'build/',
                        expand: true,
                        src: ['src/app/framework/views/*.html']
                    }
                ],
                options: {
                    patterns: [
                        {
                            match: /\<\!\-\-menus\-dt\-start[\s\S]*menus\-dt\-end\-\-\>/,
                            replacement: function () {
                                return "";
                            }
                        }
                    ]
                }
            },
             "tlf-spain": {
                files: [
                    {
                        dest: 'build/',
                        expand: true,
                        src: ['src/app/framework/views/*.html']
                    }
                ],
                options: {
                    patterns: [
                        {
                            match: /\<\!\-\-menus\-dt\-start[\s\S]*menus\-dt\-end\-\-\>/,
                            replacement: function () {
                                return "";
                            }
                        }
                    ]
                }
            },
            default: {
                files: [
                    {
                        dest: 'build/',
                        expand: true,
                        src: ['src/app/framework/views/*.html']
                    }
                ],
                options: {
                    patterns: [
                        {
                            match: /\<\!\-\-menus\-dt\-start[\s\S]*menus\-dt\-end\-\-\>/,
                            replacement: function () {
                                return "";
                            }
                        }
                    ]
                }
            },
            hws: {
                files: [
                    {
                        dest: 'build/',
                        expand: true,
                        src: ['src/app/framework/views/*.html']
                    }
                ],
                options: {
                    patterns: [
                        {
                            match: /\<\!\-\-menus\-dt\-start[\s\S]*menus\-dt\-end\-\-\>/,
                            replacement: function () {
                                return "";
                            }
                        }
                    ]
                }
            },
            ctc: {
                files: [
                    {
                        dest: 'build/',
                        expand: true,
                        src: ['src/app/framework/views/*.html']
                    }
                ],
                options: {
                    patterns: [
                        {
                            match: /\<\!\-\-menus\-dt\-start[\s\S]*menus\-dt\-end\-\-\>/,
                            replacement: function () {
                                return "";
                            }
                        }
                    ]
                }
            },

            ocb: {
                files: [
                    {
                        dest: 'build/',
                        expand: true,
                        src: ['src/app/framework/views/*.html']
                    }
                ],
                options: {
                    patterns: [
                        {
                            match: /\<\!\-\-menus\-dt\-start[\s\S]*menus\-dt\-end\-\-\>/,
                            replacement: function () {
                                return "";
                            }
                        }
                    ]
                }
            },

            fixtures: {
                files: [
                    {
                        dest: './',
                        expand: true,
                        src: ['build/**/**.js']
                    }
                ],
                options: {
                    patterns: [
                        {
                            match: /define\s*\(\s*((\'|\")[\w\d\-_\/.!\,\:\[\]]+(\'|")\s*,?\s*)*\s*\[\s*((\'|")[\w\d\-_\/.!\,\:\[\]]+(\'|")\s*,?\s*)*\s*\]/ig,

                            replacement: function (matchedString) {
                                return matchedString.replace(/(\'|")fixtures(\/[\w]+)+(\'|")/g, '""');
                            }
                        }
                    ]
                }
            },
            supportLanguage: {
                files: [
                    {
                        dest: './',
                        expand: false,
                        src: ['build/urlDeal.js']
                    }
                ],
                options: {
                    patterns: [
                        {
                            //替换urlDeal.js的支持语言列表
                            match: /var\s*supportLanguage\s*=\s*\[(\'[a-z]+-[a-z]+\'\s*\,\s*)*\'[a-z]+-[a-z]+\'\s*\]\s*\;/,
                            replacement: function (matchedString) {
                                var lang = grunt.config("supportLanguage")[target];
                                return "var supportLanguage = ['" + lang.join("','") + "'];";
                            }
                        }
                        //,
                        //{
                        //    //替换urlDeal.js的cookieDomain
                        //    match: /window.cloudCookieDomain\s*=\s*['|"](.)*['|"]\s*\;/,
                        //    replacement: function (matchedString) {
                        //        var cookieShareDomain = grunt.config("cookieShareDomain")[target];
                        //        return "window.cloudCookieDomain = '" + cookieShareDomain + "';";
                        //    }
                        //}
                    ]
                }
            },
            supportLanguage2: {
                files: [
                    {
                        dest: './',
                        expand: false,
                        src: ['build/src/app/framework/controllers/serviceCtrl.js']
                    }
                ],
                options: {
                    patterns: [
                        {
                            //替换serviceCtrl.js的语言选择列表
                            match: /\$rootScope\.supportLanguage\s*=\s*\[\s*\[(.)*\]\s*\]\s*\;/,
                            replacement: function (matchedString) {
                                var lang = grunt.config("supportLanguage")[target];
                                var languageMapping = grunt.config("languageMapping");
                                var langMap = [];
                                for (var i = 0; i < lang.length; i++) {
                                    for (var j = 0; j < languageMapping.length; j++) {
                                        if (lang[i] === languageMapping[j][0]) {
                                            langMap.push(languageMapping[j][1]);
                                        }
                                    }
                                }
                                return "$rootScope.supportLanguage = [" + langMap.join(',') + "];";
                            }
                        }
                    ]
                }
            },
            remoteServer: {
                files: [
                    {
                        dest: './',
                        expand: true,
                        src: ['build/lib/angular-ui/ui-router/angular-ui-router.js', 'build/lib/require.js', 'build/lib/tiny/tiny.min.js']
                    }
                ],
                options: {
                    patterns: [
                        {
                            match: /\/\/static\.console\.hwclouds\.com\//g,
                            replacement: '<%= grunt.config("remoteResource").staticResourceServer %>'
                        }
                    ]
                }
            }
        },

        //css 合并
        concat: {
            css: {
                //Concatenate all of the files in the cssResources configuration property
                src: ['theme/default/css/frame.common.css', 'theme/default/css/frameIcon.css', 'theme/default/css/framework.css', 'theme/default/css/frameworkext.css', 'theme/default/css/tiny.min.css', 'theme/default/css/tinyext.min.css'],
                dest: 'build/theme/default/css/combined-framework.min.css'
            }

        },

        //css 压缩
        cssmin: {
            options: {
                compatibility: {
                    properties: {
                        urlQuotes: true
                    }
                }
            },
            target: {
                files: [{
                    expand: true,
                    src: ['build/theme/default/**/*.css']
                }]
            }
        },

        //清空所有的fixture桩文件
        safety: {
            fixtures: ["build/fixtures/**/*.js", "build/lib/can/**/*.js"]
        },


        //压缩
        uglify: {
            min: {
                options: {
                    nameCache: false,
                    compress: {
                        drop_console: true,
                        join_vars: false,
                        negate_iife: false,
                        sequences: false,
                        hoist_vars: true,
                        if_return: false
                    },
                    mangle: false,
                    beautify: {
                        quote_keys: true,
                        quote_style: 1
                    }
                },
                files: [
                    {cwd: "build/", src: ["i18n/**/*.js", '!i18n/**/*.min.js'], dest: "build/", expand: true},
                    {
                        cwd: "build/",
                        src: ["lib/**/*.js", '!lib/**/*.min.js', '!lib/tiny/tiny*all.js', '!lib/can/**/*.js'],
                        dest: "build/",
                        expand: true
                    },
                    {cwd: "build/", src: ["src/**/*.js", '!src/**/*.min.js'], dest: "build/", expand: true},
                    {cwd: "build/", src: ["urlDeal.js"], dest: "build/", expand: true},
                    {cwd: "build/", src: ["browserChecker.js"], dest: "build/", expand: true}
                ]
            },
            tiny: {
                options: {
                    nameCache: false,
                    compress: {
                        drop_console: true,
                        join_vars: false,
                        negate_iife: false,
                        sequences: false,
                        hoist_vars: true,
                        if_return: false
                    },
                    mangle: false,
                    beautify: {
                        quote_keys: true,
                        quote_style: 1
                    }
                },
                files: [
                    {src: ["lib/tiny/tiny*all.js"], dest: "build/", expand: true},
                ]
            }
        },

        //replace path and url
        replace_url: {
            framework: {
                options: {
                    remoteUrl: function () {
                        var remoteResource = grunt.config("remoteResource");
                        var target = grunt.option('target');
                        if (!target) {
                            target = 'default';
                        }
                        var staticServer = remoteResource.staticResourceServer;
                        var remoteResourcePath;
                        if (staticServer) {
                            if (staticServer.charAt(staticServer.length - 1) === '/') {
                                remoteResourcePath = remoteResource.staticResourceServer + remoteResource.frameResourceDir;
                            } else {
                                remoteResourcePath = remoteResource.staticResourceServer + '/' + remoteResource.frameResourceDir;
                            }
                            if (remoteResource.frameworkVersion) {
                                remoteResourcePath = remoteResourcePath + '/' + remoteResource.frameworkVersion;
                            }
                        }
                        return remoteResourcePath;
                    },
                    cwd: 'build',
                    targetFiles: [{src: ['/']}],
                    files: [
                        {src: ['/']}
                    ]
                }
            }
        }

    });
    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-replace-url');
    grunt.loadNpmTasks('grunt-safety');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    var target = grunt.option('target');
    if (!target) {
        target = 'default';
    }

    grunt.registerTask('test', ['clean', 'copy:main', 'copy:' + target, 'copy:fixtures', 'replace:gather', 'concat', 'cssmin',
        'replace:supportLanguage', 'replace:supportLanguage2', 'uglify:min', 'replace:remoteServer', 'replace:remoteServer', 'replace:' + target, 'replace_url']);
    grunt.registerTask('package', ['jshint', 'clean', 'copy:main', 'copy:' + target, 'replace:gather', 'concat', 'cssmin',
        'safety', 'replace:supportLanguage', 'replace:supportLanguage2', 'uglify:min', 'replace:i18n', 'replace:fixtures', 'replace:remoteServer', 'replace:' + target, 'replace_url']);
    grunt.registerTask('css', ['clean', 'copy', 'replace:gather', 'concat', 'cssmin']);
    grunt.registerTask('ci-checks', ['jshint']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['package']);
};
