package com.huawei.siteapp.poiInner;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * Created by z00390414 on 2017/6/29.
 *
 * @version 1.0
 */
public class TemplateTest {

    public static void main(String[] args) throws IOException {

        //excel模板路径
        File fi=new File("D:\\HostReportTemplate.xlsx");
        POIFSFileSystem fs = new POIFSFileSystem(new FileInputStream(fi));
        //读取excel模板
        HSSFWorkbook wb = new HSSFWorkbook(fs);
        //读取了模板内所有sheet内容
        HSSFSheet sheet = wb.getSheetAt(1);
        //在相应的单元格进行赋值
        HSSFCell cell = sheet.getRow(6).getCell(1);
        cell.setCellValue("测试");
//        HSSFCell cell2 = sheet.getRow(3).getCell(3);
//        cell2.setCellValue("数据");
//        HSSFCell cell3 = sheet.getRow(0).getCell(0);
//        cell3.setCellValue("大标题");
        //修改模板内容导出新模板
        FileOutputStream out = new FileOutputStream("D:/export.xls");
        wb.write(out);
        out.close();
    }
}
