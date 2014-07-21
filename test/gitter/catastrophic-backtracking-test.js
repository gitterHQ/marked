/*jslint node: true */
/*global describe:true, it: true, beforeEach:true, afterEach:true */
"use strict";

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var util = require('util');
var marked = require('../..');

describe('catastrophic backtracking', function() {
  it('should handle c++ stacktraces', function() {

    marked.InlineLexer.output("<pre>-;sqlite3pp::query::query_iterator::query_iterator(sqlite3pp::query*);;\n"+
    "-;sqlite3pp::query::begin();;\n"+
    "-;trigger::SyncSession::replayRemoteInsertionsInTable(std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> >&);;\n"+
    "-;trigger::SyncSession::replayRemoteInsertions();;\n"+
    "-;boost::function0<void>::operator()() const;;\n"+
    "-;trigger::SyncSession::processAllTables()::$_12::operator()(boost::function<void ()> const&) const;;\n"+
    "-;trigger::SyncSession::processAllTables();;\n"+
    "-;trigger::SyncSession::sync(std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&, std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&, std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> >, std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> >, std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> >, std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> >, boost::function<void (void const*, char const*)>, boost::function<void (void const*, float)>, boost::function<void (void const*)>, boost::function<void (void const*)>, boost::function<bool (void const*)>, boost::function<void (void const*)>, boost::function<void (std::__1::vector<std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> >, std::__1::allocator<std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > > > const&, void const*)>, bool, void const*, bool);;\n"+
    "XCxxSyncSession;Y:;XY.mm;253\n"+
    "XCxxSyncSession;Y:;XY.mm;240\n"+
    "XYZ;YLocalDatabaseAtPath:withRemoteDatabaseAtPath:error:;XYZ.mm;909\n"+
    "XYZ;YLocalDatabaseAtPath:withRemoteDatabaseAtPath:error:;XYZ.mm;894\n"+
    "XDatabaseMerging;performYWithDatabase:completion:;XDatabaseMerging.m;146\n"+
    "XDatabaseMerging;performYWithDatabase:completion:;XDatabaseMerging.m;125\n"+
    "XDatabaseMerging;performYWithDatabases:completion:;XDatabaseMerging.m;109\n"+
    "XRemoteLibraryManager;sync;XRemoteLibraryManager.mm;2212</pre>\n"+
    "\n"+
    "\n", {}, {
      gfm: true,
      linkify: true,
    });
  });

});
