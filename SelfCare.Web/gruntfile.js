/// <binding AfterBuild='less' ProjectOpened='watch' />
module.exports = function (grunt) {
    grunt.initConfig({
        bower: {
            install: {
                options: {
                    targetDir: 'wwwroot/lib',
                    layout: 'byComponent',
                    cleanTargetDir: false
                }
            }
        },
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

    grunt.registerTask('default', ['bower:install']);

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
};