/// <binding AfterBuild='less' ProjectOpened='watch' />
module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            less: {
                files: ['content/*.less'],
                tasks: ['less'],
                options: {
                    livereload: true
                }
            },
            typescript: {
                files: 'TypeScripts/**/*.ts',
                tasks: ['typescript']
            }
        },
        typescript: {
            base: {
                src: ['TypeScripts/reference.ts'],
                dest: 'Scripts/selfcare.js',
                options: {
                    module: 'amd',
                    target: 'es5'
                }
            }
        },
        less: {
            build: {
                files: {
                    'content/app.css': 'content/app.less'
                }
            },
            production: {
                options: {
                    cleancss: true
                },
                files: {
                    "content/app.min.css": 'content/app.less'
                }
            },
            development: {
                options: {
                    paths: ['content']
                },
                files: {
                    "content/app.css": 'content/app.less'
                }
            }
        }
    });

    grunt.registerTask('default', ['less:build']);
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
