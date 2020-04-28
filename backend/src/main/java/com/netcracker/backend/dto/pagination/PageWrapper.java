package com.netcracker.backend.dto.pagination;

import java.util.List;

public class PageWrapper<T> {
    private List<T> content;
    private int totalPages;

    public PageWrapper() {}

    public PageWrapper(List<T> content, int totalPages) {
        this.content = content;
        this.totalPages = totalPages;
    }

    public List<T> getContent() {
        return content;
    }

    public void setContent(List<T> content) {
        this.content = content;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }
}
