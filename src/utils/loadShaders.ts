export const loadShaders = (filenames: string[]) => Promise.all(
  filenames.map(
    filename => fetch(`./shaders/${filename}`)
      .then(data => data.text()),
  ),
);
