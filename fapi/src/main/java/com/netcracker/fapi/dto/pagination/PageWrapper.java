package com.netcracker.fapi.dto.pagination;

import java.util.List;

public class PageWrapper {
    private List content;
    private int totalPages;

    public List getContent() {
        return content;
    }

    public void setContent(List content) {
        this.content = content;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }
}
