package com.huawei.siteapp.tools;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

/**
 * Created by z00390414 on 2017/7/3.
 *
 * @version 1.0
 */
public class CodeCounter {

    static long files = 0;
    static long codeLines = 0;
    static long commentLines = 0;
    static long blankLines = 0;
    static ArrayList<File> fileArray = new ArrayList<File>();

    /**
     * 代码行数统计
     */
    public static void main(String[] args) {
        String file = CodeCounter.class.getResource("/").getFile();
        String path = file.replace("target/test-classes", "src");

        ArrayList<File> al = getFile(new File(path));
        for (File f : al) {
            if (f.getName().matches(".*\\.java$")) { // 匹配java格式的文件
                count(f);
                System.out.println(f);
            }
        }
        System.out.println("统计文件：" + files);
        System.out.println("代码行数：" + codeLines);
        System.out.println("注释行数：" + commentLines);
        System.out.println("空白行数：" + blankLines);

        try {
            writeFile1();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    /**
     * 获得目录下的文件和子目录下的文件
     *
     * @param f
     * @return
     */
    public static ArrayList<File> getFile(File f) {
        File[] ff = f.listFiles();
        for (File child : ff) {
            if (child.isDirectory()) {
                getFile(child);
            } else
                fileArray.add(child);
        }
        return fileArray;

    }

    /**
     * 统计方法
     *
     * @param f
     */
    private static void count(File f) {
        BufferedReader br = null;
        boolean flag = false;
        try {
            br = new BufferedReader(new FileReader(f));
            String line = "";
            while ((line = br.readLine()) != null) {
                line = line.trim(); // 除去注释前的空格
                if (line.matches("^[ ]*$")) { // 匹配空行
                    blankLines++;
                } else if (line.startsWith("//")) {
                    commentLines++;
                } else if (line.startsWith("/*") && !line.endsWith("*/")) {
                    commentLines++;
                    flag = true;
                } else if (line.startsWith("/*") && line.endsWith("*/")) {
                    commentLines++;
                } else if (flag) {
                    commentLines++;
                    if (line.endsWith("*/")) {
                        flag = false;
                    }
                } else {
                    codeLines++;
                }
            }
            files++;
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (br != null) {
                try {
                    br.close();
                    br = null;
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public static void writeFile1() throws IOException {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        System.out.println(df.format(new Date()));// new Date()为获取当前系统时间
        String content = "time：" + df.format(new Date())+", ";
//        bw.write("当前时间：" + df.format(new Date()));
        content = content + "" + "file num：" + files +", ";
        content = content + "" +"code line：" + codeLines+", ";
        content = content + "" +"comment line：" + commentLines+", ";
        content = content + "" +"brank line：" + blankLines+".\n";
//            bw.write("something");
        String fileName = "codeNumCount.txt";
        CodeCounter.appendMethodA(fileName, content);
    }

    /**
     * A方法追加文件：使用RandomAccessFile
     */
    public static void appendMethodA(String fileName, String content) {
        try {
            // 打开一个随机访问文件流，按读写方式
            RandomAccessFile randomFile = new RandomAccessFile(fileName, "rw");
            // 文件长度，字节数
            long fileLength = randomFile.length();
            //将写文件指针移到文件尾。
            randomFile.seek(fileLength);
            randomFile.writeBytes(content);
            randomFile.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * B方法追加文件：使用FileWriter
     */
    public static void appendMethodB(String fileName, String content) {
        try {
            //打开一个写文件器，构造函数中的第二个参数true表示以追加形式写文件
            FileWriter writer = new FileWriter(fileName, true);
            writer.write(content);
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
