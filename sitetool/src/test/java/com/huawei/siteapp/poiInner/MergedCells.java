package com.huawei.siteapp.poiInner;

import com.huawei.siteapp.common.util.UctTimeUtil;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import java.io.FileOutputStream;
import java.io.IOException;

/**
 * Created by z00390414 on 2017/6/26.
 *
 * @version 1.0
 */
public class MergedCells {
    public static void main(String[] args) throws IOException {
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet("new sheet");

        HSSFRow row0 = sheet.createRow(0);
        HSSFCell cell0 = row0.createCell(0);
        cell0.setCellValue(0);

//        HSSFRow row = sheet.createRow(0);
        HSSFCell cell1 = row0.createCell(1);
        cell1.setCellValue(1);

        HSSFCell newCell = row0.createCell(2);

        newCell.setCellFormula("A1/B1");

//        newCell.setCellFormula("A1+B1");
//        HSSFRow row = sheet.createRow(0);
        HSSFRow row = sheet.createRow(1);
        HSSFCell cell10 = row.createCell(0);
        cell10.setCellValue(2);

        HSSFCell cell11 = row.createCell(1);
        cell11.setCellValue(3);
        HSSFCell newCell2 = row.createCell(2);
        newCell2.setCellFormula("A2/B2");


//        cell.setCellFormula("POWER(A0,A0)");
//        cell = row.createCell(3);

//        sheet.addMergedRegion(new CellRangeAddress(1, 1, 1, 2));

        // Write the output to a file
        FileOutputStream fileOut = new FileOutputStream(UctTimeUtil.getCurrentDate()+"poixx.xls");
        wb.write(fileOut);
        fileOut.close();
        wb.close();
    }
}
