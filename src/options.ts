import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import chalk from "chalk";

if (ffmpegPath) {
  ffmpeg.setFfmpegPath(ffmpegPath);
} else {
  throw new Error("FFmpeg path not found");
}

export default class options {
  input: string;
  output: string;
  constructor(input: string, output: string) {
    this.input = input;
    this.output = output;
  }

  public compress(): void {
    ffmpeg(this.input)
      .output(this.output)
      .videoCodec("libx264")
      .size("1280x720")
      .on("start", () => {
        console.log(chalk.greenBright("Compressão iniciada com sucesso!"));
      })
      .on("progress", (progress) => {
        console.table(progress);
      })
      .on("end", () => {
        console.log(chalk.greenBright("Compressão concluída!"));
      })
      .on("error", (err: Error) => {
        console.error(chalk.redBright.bold(err.message));
        console.log(
          chalk.greenBright.bold(
            "Coloque um arquivo para ser compactado na pasta 'video'"
          )
        );
      })
      .run();
  }
}
