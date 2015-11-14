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

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
};