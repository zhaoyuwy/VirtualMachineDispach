package com.huawei.siteapp.service.ExcelService;

import com.huawei.siteapp.bean.TemplateSourceBean;
import com.huawei.siteapp.cache.InputStreamCache;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.CommonUtils;
import com.huawei.siteapp.model.MonitorVmInfoModel;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.List;

/**
 * Created by z00390414 on 2017/6/30.
 *
 * @version 1.0
 */
@Service
public class VmReportServiceImpl implements IVmReportService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private static int HOST_CNA_INFO_START = 27;
    private static int reportInfoRowIndex = 3;
    private static int REPORT_PIE_CHART_ROW_INDEX = 13;
    private static String[] FORMULA_GROUP = {"", "SUM(C28:C11000)/100", "SUM(D28:D999999)-B14", "", "", "SUM(F28:F11000)/100", "SUM(G28:G11000)-F14"};


    private static String EXCEL_TEMPLATE_PATH;


    @PostConstruct
    private void getClassesPath() {
//        D:\mine20170614\restDemo\VirtualMachineDispach\sitetool\src\main\resources\ExcelTemplate\HostReportTemplate.xlsx
        ClassLoader cl = getClass().getClassLoader();
        if (cl != null) {
//            CLASS_LOADER_PATH = cl.getResource("").getPath();
            EXCEL_TEMPLATE_PATH = cl.getResource("").getPath() + "/ExcelTemplate/VmReportTemplate.xlsx";
//            EXCEL_REPORT_RESULT_PATH = "ExcelReportResult";
        } else {
            logger.error("get class path fail!");
        }
//        try {
//            CLASS_LOADER_PATH = URLDecoder.decode(CLASS_LOADER_PATH, "UTF-8");
//            EXCEL_TEMPLATE_PATH = URLDecoder.decode(EXCEL_TEMPLATE_PATH, "UTF-8");
//            EXCEL_REPORT_RESULT_PATH = URLDecoder.decode(EXCEL_REPORT_RESULT_PATH, "UTF-8");
//        } catch (UnsupportedEncodingException e2) {
//            logger.error("Decode failed.");
//        }
    }

    @Autowired
    TemplateSourceBean templateSourceBean;

    @Override
    public int poiVmTemplate(String reportName, List<MonitorVmInfoModel> monitorVmInfoModels) throws Exception {
        logger.info("Enter VmReportServiceImpl poiVmTemplate , vmMachine size = " + monitorVmInfoModels.size());

        InputStream inputStream = InputStreamCache.getInstance().getHostTemplateInputStream();
        XSSFWorkbook wbSrcFromReport = (XSSFWorkbook) WorkbookFactory.create(inputStream);

        Sheet sheet3 = wbSrcFromReport.getSheetAt(1);
        int lastRowNum = HOST_CNA_INFO_START + monitorVmInfoModels.size() - 1;
        int dataIndex = 0;

        setPieChartDataFormula(sheet3);

        for (int rowIndex = HOST_CNA_INFO_START; rowIndex < lastRowNum; rowIndex++) {
//            Row resultRow = sheet3.createRow(HOT_CNA_INFO_START);
            MonitorVmInfoModel monitorCpuMem = monitorVmInfoModels.get(dataIndex);
            dataIndex++;
            int cellIndex = 0;
            Row row = sheet3.createRow(rowIndex);
            Cell cell_0 = row.createCell(cellIndex++);
            cell_0.setCellValue(monitorCpuMem.getMonitorObjectName());

            Cell cell_1 = row.createCell(cellIndex++);
            cell_1.setCellValue(monitorCpuMem.getTime());

            Cell cell_2 = row.createCell(cellIndex++);
            cell_2.setCellValue(monitorCpuMem.getMonitorUsedCpu());

            Cell cell_3 = row.createCell(cellIndex++);
            cell_3.setCellValue(monitorCpuMem.getMonitorTotalCpu());

            Cell cell_4 = row.createCell(cellIndex++);
            cell_4.setCellValue(monitorCpuMem.getMonitorCpuUsage());

            Cell cell_5 = row.createCell(cellIndex++);
            cell_5.setCellValue(monitorCpuMem.getMonitorUsedMem());

            Cell cell_6 = row.createCell(cellIndex++);
            cell_6.setCellValue(monitorCpuMem.getMonitorTotalMem());

            Cell cell_7 = row.createCell(cellIndex);
            cell_7.setCellValue(monitorCpuMem.getMonitorMemUsage());
        }
//        FileOutputStream fileOut = new FileOutputStream(EXCEL_REPORT_RESULT_PATH+"/"+reportName + ".xlsx");
//        FileOutputStream fileOut = new FileOutputStream(EXCEL_REPORT_RESULT_PATH+"/"+reportName + ".xlsx");
        FileOutputStream fileOut = new FileOutputStream(reportName + ".xlsx");
        wbSrcFromReport.write(fileOut);
        fileOut.close();
        wbSrcFromReport.close();
        logger.info("Exit VmReportServiceImpl poiVmTemplate , vmMachine size = " + monitorVmInfoModels.size());
        logger.info("Exit save data in excel using poi");
        return RetCode.OK;
    }

    private void setPieChartDataFormula(Sheet sheet) {
        Row pieDataRow = sheet.createRow(REPORT_PIE_CHART_ROW_INDEX);
        for (int pieCelIndex = 0; pieCelIndex < 7; pieCelIndex++) {
            Cell pieCell = pieDataRow.createCell(pieCelIndex);

            if (CommonUtils.isNull(FORMULA_GROUP[pieCelIndex])) {
                continue;
            }
            pieCell.setCellType(XSSFCell.CELL_TYPE_FORMULA);
            pieCell.setCellFormula(FORMULA_GROUP[pieCelIndex]);
        }
    }
}
