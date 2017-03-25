'use strict';

import path from 'path';
import jpegoptim from 'imagemin-jpegoptim';

const image = ({
  gulp,
  config,
  plugins,
  taskTarget,
  args
}) => {
  const dir = config.directory;
  const dest = path.join(taskTarget, dir.asset.replace(/\_/, ''), dir.image);

  gulp.task('image', () => {
    return gulp
      .src(path.join(
        dir.source,
        dir.asset,
        dir.image,
        '**/*.{jpg,jpeg,gif,svg,png}'
      ))
      // .pipe(plugins.changed(dest))
      // .pipe(plugins.debug())
      .pipe(plugins.if(
        args.production,
        plugins.imagemin([
        	plugins.imagemin.gifsicle({interlaced: true}),
        	// plugins.imagemin.jpegtran({progressive: true}),
        	jpegoptim({progressive: true, max: 85}),
        	plugins.imagemin.optipng({optimizationLevel: 5}),
        	plugins.imagemin.svgo({plugins: [{removeViewBox: true}]})
        ],{
          verbose: true
        })

      ))
      .pipe(gulp.dest(dest));
  });
};

export default image;
