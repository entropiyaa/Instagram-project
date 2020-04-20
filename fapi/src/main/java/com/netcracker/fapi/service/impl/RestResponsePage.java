//package com.netcracker.fapi.service.impl;
//
//import com.fasterxml.jackson.annotation.JsonCreator;
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import com.fasterxml.jackson.annotation.JsonProperty;
//import com.fasterxml.jackson.databind.JsonNode;
//import org.springframework.data.domain.PageImpl;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@JsonIgnoreProperties(ignoreUnknown = true)
//public class RestResponsePage<T> extends PageImpl<T> {
//    @JsonCreator(mode = JsonCreator.Mode.PROPERTIES)
//    public RestResponsePage(@JsonProperty("content") List<T> content,
//                            @JsonProperty("number") int number,
//                            @JsonProperty("size") int size,
//                            @JsonProperty("totalElements") Long totalElements,
//                            @JsonProperty("last") boolean last,
//                            @JsonProperty("totalPages") int totalPages,
//                            @JsonProperty("first") boolean first,
//                            @JsonProperty("numberOfElements") int numberOfElements,
//                            @JsonProperty("pageable") JsonNode pageable,
//                            @JsonProperty("sort") JsonNode sort) {
//
//        super(content, PageRequest.of(number, size), totalElements);
//    }
//
//    public RestResponsePage(List<T> content, Pageable pageable, long total) {
//        super(content, pageable, total);
//    }
//
//    public RestResponsePage(List<T> content) {
//        super(content);
//    }
//
//    public RestResponsePage() {
//        super(new ArrayList<>());
//    }
//}
