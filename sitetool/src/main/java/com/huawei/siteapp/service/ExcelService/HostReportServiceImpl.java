package com.huawei.siteapp.service.ExcelService;

import com.huawei.siteapp.bean.HostInfoBean;
import com.huawei.siteapp.bean.HostVmReportInfoBean;
import com.huawei.siteapp.cache.InputStreamCache;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.CommonUtils;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.model.MonitorCnaInfoModel;
import com.huawei.siteapp.model.SiteModel;
import com.huawei.siteapp.repository.MonitorCnaInfoRepository;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by z00390414 on 2017/6/26.
 *
 * @version 1.0
 */
@Service
public class HostReportServiceImpl implements IHostReportService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private static int COVER_REPORT_TIME = 23;
    private static int COVER_REPORT_INFO = 24;

    private static int HOST_CNA_INFO_START = 27;
    private static int REPORT_INFO_ROW_INDEX = 3;
    private static int REPORT_INFO_ROW_INDEX_2 = 6;
    private static int REPORT_PIE_CHART_ROW_INDEX = 13;
    private static String[] FORMULA_GROUP = {"", "SUM(C28:C11000)/100", "SUM(D28:D999999)-B14", "", "", "SUM(F28:F11000)/100", "SUM(G28:G11000)-F14"};

 /*   @Autowired
    TemplateSourceBean templateSourceBean;*/

//    @PostConstruct
//    private void getClassesPath() {
////        D:\mine20170614\restDemo\VirtualMachineDispach\sitetool\src\main\resources\ExcelTemplate\HostReportTemplate.xlsx
//        ClassLoader cl = getClass().getClassLoader();
//        if (cl != null) {
////            CLASS_LOADER_PATH = cl.getResource("").getPath();
////            EXCEL_TEMPLATE_PATH = CLASS_LOADER_PATH + "/ExcelTemplate/HostReportTemplate2.xlsx";
////            EXCEL_REPORT_RESULT_PATH = "ExcelReportResult";
//        } else {
//            logger.error("get class path fail!");
//        }
////        try {
////            CLASS_LOADER_PATH = URLDecoder.decode(CLASS_LOADER_PATH, "UTF-8");
////            EXCEL_TEMPLATE_PATH = URLDecoder.decode(EXCEL_TEMPLATE_PATH, "UTF-8");
////            EXCEL_REPORT_RESULT_PATH = URLDecoder.decode(EXCEL_REPORT_RESULT_PATH, "UTF-8");
////        } catch (UnsupportedEncodingException e2) {
////            logger.error("Decode failed.");
////        }
//    }


    @Override
    public int poiTemplate(String reportNameInfo, List<MonitorCnaInfoModel> monitorCpuMemModels) throws Exception {
        logger.info("Enter HostReportServiceImpl poiTemplate , hostCNA size = " + monitorCpuMemModels.size());

        InputStream inputStream = InputStreamCache.getInstance().getHostTemplateInputStream();

        XSSFWorkbook wbSrcFromReport = (XSSFWorkbook) WorkbookFactory.create(inputStream);

        String[] reportNames = reportNameInfo.split("_");
        String reportTime = reportNames[4];
        String reportName = reportNames[0] + reportNames[1];
        String reportFcIp = reportNames[2];

        setReportCoverInfo(wbSrcFromReport, reportTime, reportNames[0] + "_" + reportNames[1] + "_" + reportNames[3]);
        Sheet sheet3 = wbSrcFromReport.getSheetAt(1);
        int lastRowNum = HOST_CNA_INFO_START + monitorCpuMemModels.size() - 1;
        int dataIndex = 0;

        setPieChartDataFormula(sheet3);

        for (int rowIndex = 0; rowIndex < lastRowNum; rowIndex++) {
            List<String> params = new ArrayList<>();
            params.add(reportName);
            params.add("测试报告");
            params.add("周期任务.");
            params.add("null");
            params.add("timee");
            params.add("null");
            params.add("张三/z000390414");
            setReportInfo(REPORT_INFO_ROW_INDEX, sheet3, params);

            List<String> params2 = new ArrayList<>();
            params2.add("V1000ddd.");
            params2.add(reportFcIp);
            params2.add("注释");
            setReportInfo(REPORT_INFO_ROW_INDEX_2, sheet3, params2);

            if (rowIndex < HOST_CNA_INFO_START) {
                continue;
            }

            MonitorCnaInfoModel monitorCpuMem = monitorCpuMemModels.get(dataIndex);
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

        FileOutputStream fileOut = new FileOutputStream(reportNameInfo + ".xlsx");
        wbSrcFromReport.write(fileOut);
        fileOut.close();
        wbSrcFromReport.close();
        logger.info("Exit HostReportServiceImpl poiTemplate , hostCNA size = " + monitorCpuMemModels.size());
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

    private void setReportInfo(int rowIndex, Sheet sheet3, List<String> params) {
        Row row = sheet3.createRow(rowIndex);
        for (int colIndex = 0; colIndex < params.size(); colIndex++) {
            Cell cell = row.createCell(colIndex);
            cell.setCellValue(params.get(colIndex));
        }
    }

    private void setReportCoverInfo(XSSFWorkbook wbSrcFromReport, String reportTime, String reportFcInfo) {
        Sheet sheet2 = wbSrcFromReport.getSheetAt(0);
        Row row = sheet2.getRow(COVER_REPORT_TIME);
//        String timeStr = "检查时间";
//        Cell timeStrInfo = row.createCell(0);
//        timeStrInfo.setCellValue(timeStr);
        Cell time = row.getCell(2);
        time.setCellValue(reportTime);

        Row row2 = sheet2.getRow(COVER_REPORT_INFO);
        String fcStr = "FC信息";
        Cell fcInfo = row2.getCell(2);
        fcInfo.setCellValue(reportFcInfo);
    }

    //    封装返回结果2017年7月13日 09:47:50
    public HostVmReportInfoBean getResponseBody(SiteModel siteModel) {
        MonitorCnaInfoRepository monitorCnaInfoRepository = SpringUtil.getBean(MonitorCnaInfoRepository.class);
        List<MonitorCnaInfoModel> monitorCnaInfoModels = monitorCnaInfoRepository.findMonitorCnaInfoModelsBySiteId(siteModel.getSiteId());

        List<HostInfoBean> hostInfoBeans = new ArrayList<>();
        HostVmReportInfoBean hostVmReportInfoBean = new HostVmReportInfoBean(hostInfoBeans);
        hostVmReportInfoBean.setHostOrVm(0);
        hostVmReportInfoBean.setTime("2017-07-11 171326_2017-07-11 171526");

        int total = monitorCnaInfoModels.size();
        hostVmReportInfoBean.setTotal(total);

        int monitorTotalUsedCpu = 0;
        int monitorTotalUsedMem = 0;

        int monitorTotalTotalCpu = 0;
        int monitorTotalTotalMem = 0;

        for (MonitorCnaInfoModel monitorCnaInfoModelTemp : monitorCnaInfoModels) {
            HostInfoBean hostInfoBean = new HostInfoBean();
            hostInfoBean.setHostName(monitorCnaInfoModelTemp.getMonitorObjectName());

            int monitorUsedCpu = monitorCnaInfoModelTemp.getMonitorUsedCpu();
            int monitorTotalCpu = monitorCnaInfoModelTemp.getMonitorTotalCpu();

            hostInfoBean.setMonitorUsedCpu(monitorUsedCpu);
            hostInfoBean.setMonitorTotalCpu(monitorTotalCpu);
            hostInfoBean.setMonitorCpuUsage(monitorCnaInfoModelTemp.getMonitorCpuUsage());

            monitorTotalUsedCpu += monitorUsedCpu;
            monitorTotalTotalCpu += monitorTotalCpu;

            int monitorUsedMem = monitorCnaInfoModelTemp.getMonitorUsedCpu();
            int monitorTotalMem = monitorCnaInfoModelTemp.getMonitorTotalMem();
            hostInfoBean.setMonitorUsedMem(monitorUsedMem);
            hostInfoBean.setMonitorTotalMem(monitorTotalMem);
            hostInfoBean.setMonitorMemUsage(monitorCnaInfoModelTemp.getMonitorMemUsage());

            monitorTotalUsedMem += monitorUsedMem;
            monitorTotalTotalMem += monitorTotalMem;

            hostInfoBean.setClusterName(monitorCnaInfoModelTemp.getClusterId() + "clusterId");
            hostInfoBean.setHostIp(monitorCnaInfoModelTemp.getHostId() + "hostIp");

            hostInfoBeans.add(hostInfoBean);
        }
        hostVmReportInfoBean.setMonitorCpuUsage(monitorTotalUsedCpu * 1.0 / monitorTotalTotalCpu);
        hostVmReportInfoBean.setMonitorMemUsage(monitorTotalUsedMem * 1.0 / monitorTotalTotalMem);
        return hostVmReportInfoBean;
    }
}
