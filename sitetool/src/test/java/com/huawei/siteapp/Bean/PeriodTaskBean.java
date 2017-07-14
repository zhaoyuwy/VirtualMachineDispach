package com.huawei.siteapp.Bean;

/**
 * Created by z00390414 on 2017/7/14.
 *
 * @version 1.0
 */

import com.fasterxml.jackson.annotation.*;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

import java.util.HashMap;
import java.util.Map;


@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "siteRegion",
        "taskType",
        "siteRegionName",
        "periodTime",
        "isSendEmail",
        "taskName",
        "siteLoginIp"
})
public class PeriodTaskBean {

    @JsonProperty("siteRegion")
    private String siteRegion;
    @JsonProperty("taskType")
    private Integer taskType;
    @JsonProperty("siteRegionName")
    private String siteRegionName;
    @JsonProperty("periodTime")
    private String periodTime;
    @JsonProperty("isSendEmail")
    private Boolean isSendEmail;
    @JsonProperty("taskName")
    private String taskName;
    @JsonProperty("siteLoginIp")
    private String siteLoginIp;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    /**
     * @return The siteRegion
     */
    @JsonProperty("siteRegion")
    public String getSiteRegion() {
        return siteRegion;
    }

    /**
     * @param siteRegion The siteRegion
     */
    @JsonProperty("siteRegion")
    public void setSiteRegion(String siteRegion) {
        this.siteRegion = siteRegion;
    }

    /**
     * @return The taskType
     */
    @JsonProperty("taskType")
    public Integer getTaskType() {
        return taskType;
    }

    /**
     * @param taskType The taskType
     */
    @JsonProperty("taskType")
    public void setTaskType(Integer taskType) {
        this.taskType = taskType;
    }

    /**
     * @return The siteRegionName
     */
    @JsonProperty("siteRegionName")
    public String getSiteRegionName() {
        return siteRegionName;
    }

    /**
     * @param siteRegionName The siteRegionName
     */
    @JsonProperty("siteRegionName")
    public void setSiteRegionName(String siteRegionName) {
        this.siteRegionName = siteRegionName;
    }

    /**
     * @return The periodTime
     */
    @JsonProperty("periodTime")
    public String getPeriodTime() {
        return periodTime;
    }

    /**
     * @param periodTime The periodTime
     */
    @JsonProperty("periodTime")
    public void setPeriodTime(String periodTime) {
        this.periodTime = periodTime;
    }

    /**
     * @return The isSendEmail
     */
    @JsonProperty("isSendEmail")
    public Boolean getIsSendEmail() {
        return isSendEmail;
    }

    /**
     * @param isSendEmail The isSendEmail
     */
    @JsonProperty("isSendEmail")
    public void setIsSendEmail(Boolean isSendEmail) {
        this.isSendEmail = isSendEmail;
    }

    /**
     * @return The taskName
     */
    @JsonProperty("taskName")
    public String getTaskName() {
        return taskName;
    }

    /**
     * @param taskName The taskName
     */
    @JsonProperty("taskName")
    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    /**
     * @return The siteLoginIp
     */
    @JsonProperty("siteLoginIp")
    public String getSiteLoginIp() {
        return siteLoginIp;
    }

    /**
     * @param siteLoginIp The siteLoginIp
     */
    @JsonProperty("siteLoginIp")
    public void setSiteLoginIp(String siteLoginIp) {
        this.siteLoginIp = siteLoginIp;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    @JsonAnySetter
    public void setAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder().append(siteRegion).append(taskType).append(siteRegionName).append(periodTime).append(isSendEmail).append(taskName).append(siteLoginIp).append(additionalProperties).toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof PeriodTaskBean) == false) {
            return false;
        }
        PeriodTaskBean rhs = ((PeriodTaskBean) other);
        return new EqualsBuilder().append(siteRegion, rhs.siteRegion).append(taskType, rhs.taskType).append(siteRegionName, rhs.siteRegionName).append(periodTime, rhs.periodTime).append(isSendEmail, rhs.isSendEmail).append(taskName, rhs.taskName).append(siteLoginIp, rhs.siteLoginIp).append(additionalProperties, rhs.additionalProperties).isEquals();
    }

}
