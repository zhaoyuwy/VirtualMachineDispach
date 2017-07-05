package com.huawei.siteapp.stream;

import java.io.FileInputStream;
import java.io.InputStream;


/**
 * Created by z00390414 on 2017/7/1.
 *
 * @version 1.0
 */
public class InputStreamDemo {
    public static void main(String[] args) throws Exception {
        InputStream is = null;

        try {

            // new input stream created
            is = new FileInputStream("D://test.txt");

            System.out.println("Characters printed:");
            // create new buffered reader

            // reads and prints BufferedReader
            System.out.println((char)is.read());
            System.out.println((char)is.read());

            // mark invoked at this position
            is.mark(0);
            System.out.println("mark() invoked");
            System.out.println((char)is.read());
            System.out.println((char)is.read());

            // reset() repositioned the stream to the mark
            if(is.markSupported()) {
                is.reset();
                System.out.println("reset() invoked");
                System.out.println((char)is.read());
                System.out.println((char)is.read());
            } else {
                System.out.print("InputStream does not support reset()");
            }

        } catch(Exception e) {

            // if any I/O error occurs
            e.printStackTrace();
        } finally {

            // releases system resources associated with this stream
            if(is!=null)
                is.close();
        }
    }
}
