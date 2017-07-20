package com.huawei.siteapp.controller;

import com.huawei.siteapp.bean.Result;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.repository.SiteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by z00390414 on 2017/7/19.
 *
 * @version 1.0
 */
@RestController
@RequestMapping("/report")
public class ReportController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private ServletContext servletContext;

    @RequestMapping(value = "/testDownload", method = RequestMethod.GET)
    public Result testDownload(HttpServletResponse res) {

        Result result = new Result();
        logger.info("report/testDownload begin");
//        String fileName = "output.xlsx";
        String fileName = "test.txt";
        res.setHeader("content-type", "application/octet-stream");
        res.setContentType("application/octet-stream");
        res.setHeader("Content-Disposition", "attachment;filename=" + fileName);
        byte[] buff = new byte[1024];
        BufferedInputStream bis = null;
        OutputStream os = null;
        try {
            os = res.getOutputStream();
            bis = new BufferedInputStream(new FileInputStream(new File("d://"
                    + fileName)));
            int i = bis.read(buff);
            while (i != -1) {
                os.write(buff, 0, buff.length);
                os.flush();
                i = bis.read(buff);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (bis != null) {
                try {
                    bis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        System.out.println("success");
        logger.info("success");
        logger.info("report/testDownload end");
        result.setStatus(RetCode.OK);
        result.setMsg("OK");
        result.setData(null);
        return result;
    }

    @RequestMapping(value = "/testDownload2", method = RequestMethod.GET)
    public int testDownload2(HttpServletResponse res) throws IOException {
        String fileName = "test.txt";
        res.setHeader("content-type", "application/octet-stream");
        res.setContentType("application/octet-stream");
        res.setHeader("Content-Disposition", "attachment;filename=test.txt");
        File file = new File("D://test.txt");

        FileOutputStream fos = new FileOutputStream(file);

        res.setContentLengthLong(file.length());
        fos.close();
        return RetCode.OK;
    }

    @RequestMapping(value = "/files", method = RequestMethod.GET)
    public void getFile(
            HttpServletResponse response) {
        try {
            // get your file as InputStream
//            InputStream is = new InputStream(new FileInputStream(new File("")));
            InputStream is = null;

            try {
                is = new FileInputStream("D://test.txt");


            } catch (FileNotFoundException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            // copy it to response's OutputStream
            org.apache.commons.io.IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();
            is.close();
        } catch (IOException ex) {
            logger.info("Error writing file to output stream. Filename was '{}'", "test.txt", ex);
            throw new RuntimeException("IOError writing file to output stream");
        }

    }

    //@RequestMapping(value = "/files/{file_name}", method = RequestMethod.GET)
//@ResponseBody
//public FileSystemResource getFile(@PathVariable("file_name") String fileName) {
//    return new FileSystemResource(myService.getFileFor(fileName));
//}
    private InputStream getInputStream() {
        InputStream is = null;

        try {
            is = new FileInputStream("D://test.txt");

            is.close();
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return is;
    }


    @ResponseBody
    @RequestMapping(value = "/getHostReport/{siteRegionName}", method = RequestMethod.GET)
    public Result getHostReport(@PathVariable String siteRegionName, @RequestParam String siteRegion, @RequestParam String siteLoginIp) {
        logger.info("@@@@@@@@@@  SysGetCanVmInfoController getCanVmInfo");
        SiteRepository siteRepository = SpringUtil.getBean(SiteRepository.class);
        int retCode = RetCode.OK;
        Result result = new Result();
//        SiteModel siteModel = siteRepository.findSiteModelBySiteRegionNameAndSiteRegionAndSiteLoginIp(siteRegionName, siteRegion, siteLoginIp);
//
//        MonitorAllVmsServiceImpl monitorAllVmsService = SpringUtil.getBean(MonitorAllVmsServiceImpl.class);
//        retCode = monitorAllVmsService.fcGetSitesClustersHostsAllVrmRest(siteModel);

        result.setStatus(retCode);
        result.setMsg("OK");
        result.setData(body());
        return result;
    }

    private Map<String, String> body() {
        Map<String, String> map = new HashMap<>();
        System.out.println(System.getProperty("user.dir"));

        String reportName = "\\report\\2017_06_29_12_44_36.xlsx";
        String path = System.getProperty("user.dir");
        map.put("reportPath", path+reportName);
        return map;


    }
}
