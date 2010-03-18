arithmeticsParser = (function(){
  var result = new PEG.Parser("start");
  
  result._parse_start = function(context) {
    this._cache["start"] = this._cache["start"] || [];
    var cachedResult = this._cache["start"][this._pos];
    if (cachedResult !== undefined) {
      this._pos += cachedResult.length;
      return cachedResult.result;
    }
    
    var pos = this._pos;
    
    
    var result0 = this._parse_additive(context);
    
    
    
    this._cache["start"][pos] = {
      length: this._pos - pos,
      result: result0
    };
    return result0;
  };
  
  result._parse_additive = function(context) {
    this._cache["additive"] = this._cache["additive"] || [];
    var cachedResult = this._cache["additive"][this._pos];
    if (cachedResult !== undefined) {
      this._pos += cachedResult.length;
      return cachedResult.result;
    }
    
    var pos = this._pos;
    
    
    var savedPos1 = this._pos;
    var result10 = this._parse_multiplicative(context);
    if (result10 !== null) {
      if (this._input.substr(this._pos, 1) === "+") {
        var result11 = "+";
        this._pos += 1;
      } else {
        var result11 = null;
        if (context.reportMatchFailures) {
          this._matchFailed(new PEG.Parser.LiteralMatchFailure("+"));
        }
      }
      if (result11 !== null) {
        var result12 = this._parse_additive(context);
        if (result12 !== null) {
          var result9 = [result10, result11, result12];
        } else {
          var result9 = null;
          this._pos = savedPos1;
        }
      } else {
        var result9 = null;
        this._pos = savedPos1;
      }
    } else {
      var result9 = null;
      this._pos = savedPos1;
    }
    var result8 = result9 !== null
      ? (function() {  return (arguments[0]) + (arguments[2]);  }).apply(this, result9)
      : null;
    if (result8 !== null) {
      var result1 = result8;
    } else {
      var savedPos0 = this._pos;
      var result5 = this._parse_multiplicative(context);
      if (result5 !== null) {
        if (this._input.substr(this._pos, 1) === "-") {
          var result6 = "-";
          this._pos += 1;
        } else {
          var result6 = null;
          if (context.reportMatchFailures) {
            this._matchFailed(new PEG.Parser.LiteralMatchFailure("-"));
          }
        }
        if (result6 !== null) {
          var result7 = this._parse_additive(context);
          if (result7 !== null) {
            var result4 = [result5, result6, result7];
          } else {
            var result4 = null;
            this._pos = savedPos0;
          }
        } else {
          var result4 = null;
          this._pos = savedPos0;
        }
      } else {
        var result4 = null;
        this._pos = savedPos0;
      }
      var result3 = result4 !== null
        ? (function() {  return (arguments[0]) - (arguments[2]);  }).apply(this, result4)
        : null;
      if (result3 !== null) {
        var result1 = result3;
      } else {
        var result2 = this._parse_multiplicative(context);
        if (result2 !== null) {
          var result1 = result2;
        } else {
          var result1 = null;;
        };
      };
    }
    
    
    
    this._cache["additive"][pos] = {
      length: this._pos - pos,
      result: result1
    };
    return result1;
  };
  
  result._parse_multiplicative = function(context) {
    this._cache["multiplicative"] = this._cache["multiplicative"] || [];
    var cachedResult = this._cache["multiplicative"][this._pos];
    if (cachedResult !== undefined) {
      this._pos += cachedResult.length;
      return cachedResult.result;
    }
    
    var pos = this._pos;
    
    
    var savedPos3 = this._pos;
    var result22 = this._parse_primary(context);
    if (result22 !== null) {
      if (this._input.substr(this._pos, 1) === "*") {
        var result23 = "*";
        this._pos += 1;
      } else {
        var result23 = null;
        if (context.reportMatchFailures) {
          this._matchFailed(new PEG.Parser.LiteralMatchFailure("*"));
        }
      }
      if (result23 !== null) {
        var result24 = this._parse_multiplicative(context);
        if (result24 !== null) {
          var result21 = [result22, result23, result24];
        } else {
          var result21 = null;
          this._pos = savedPos3;
        }
      } else {
        var result21 = null;
        this._pos = savedPos3;
      }
    } else {
      var result21 = null;
      this._pos = savedPos3;
    }
    var result20 = result21 !== null
      ? (function() {  return (arguments[0]) * (arguments[2]);  }).apply(this, result21)
      : null;
    if (result20 !== null) {
      var result13 = result20;
    } else {
      var savedPos2 = this._pos;
      var result17 = this._parse_primary(context);
      if (result17 !== null) {
        if (this._input.substr(this._pos, 1) === "/") {
          var result18 = "/";
          this._pos += 1;
        } else {
          var result18 = null;
          if (context.reportMatchFailures) {
            this._matchFailed(new PEG.Parser.LiteralMatchFailure("/"));
          }
        }
        if (result18 !== null) {
          var result19 = this._parse_multiplicative(context);
          if (result19 !== null) {
            var result16 = [result17, result18, result19];
          } else {
            var result16 = null;
            this._pos = savedPos2;
          }
        } else {
          var result16 = null;
          this._pos = savedPos2;
        }
      } else {
        var result16 = null;
        this._pos = savedPos2;
      }
      var result15 = result16 !== null
        ? (function() {  return (arguments[0]) / (arguments[2]);  }).apply(this, result16)
        : null;
      if (result15 !== null) {
        var result13 = result15;
      } else {
        var result14 = this._parse_primary(context);
        if (result14 !== null) {
          var result13 = result14;
        } else {
          var result13 = null;;
        };
      };
    }
    
    
    
    this._cache["multiplicative"][pos] = {
      length: this._pos - pos,
      result: result13
    };
    return result13;
  };
  
  result._parse_primary = function(context) {
    this._cache["primary"] = this._cache["primary"] || [];
    var cachedResult = this._cache["primary"][this._pos];
    if (cachedResult !== undefined) {
      this._pos += cachedResult.length;
      return cachedResult.result;
    }
    
    var pos = this._pos;
    
    
    var result31 = this._parse_integer(context);
    if (result31 !== null) {
      var result25 = result31;
    } else {
      var savedPos4 = this._pos;
      if (this._input.substr(this._pos, 1) === "(") {
        var result28 = "(";
        this._pos += 1;
      } else {
        var result28 = null;
        if (context.reportMatchFailures) {
          this._matchFailed(new PEG.Parser.LiteralMatchFailure("("));
        }
      }
      if (result28 !== null) {
        var result29 = this._parse_additive(context);
        if (result29 !== null) {
          if (this._input.substr(this._pos, 1) === ")") {
            var result30 = ")";
            this._pos += 1;
          } else {
            var result30 = null;
            if (context.reportMatchFailures) {
              this._matchFailed(new PEG.Parser.LiteralMatchFailure(")"));
            }
          }
          if (result30 !== null) {
            var result27 = [result28, result29, result30];
          } else {
            var result27 = null;
            this._pos = savedPos4;
          }
        } else {
          var result27 = null;
          this._pos = savedPos4;
        }
      } else {
        var result27 = null;
        this._pos = savedPos4;
      }
      var result26 = result27 !== null
        ? (function() {  return (arguments[1]);  }).apply(this, result27)
        : null;
      if (result26 !== null) {
        var result25 = result26;
      } else {
        var result25 = null;;
      };
    }
    
    
    
    this._cache["primary"][pos] = {
      length: this._pos - pos,
      result: result25
    };
    return result25;
  };
  
  result._parse_integer = function(context) {
    this._cache["integer"] = this._cache["integer"] || [];
    var cachedResult = this._cache["integer"][this._pos];
    if (cachedResult !== undefined) {
      this._pos += cachedResult.length;
      return cachedResult.result;
    }
    
    var pos = this._pos;
    
    var savedReportMatchFailures = context.reportMatchFailures;
    context.reportMatchFailures = false;
    var savedPos5 = this._pos;
    if (this._input.substr(this._pos, 1) === "0") {
      var result57 = "0";
      this._pos += 1;
    } else {
      var result57 = null;
      if (context.reportMatchFailures) {
        this._matchFailed(new PEG.Parser.LiteralMatchFailure("0"));
      }
    }
    if (result57 !== null) {
      var result35 = result57;
    } else {
      if (this._input.substr(this._pos, 1) === "1") {
        var result56 = "1";
        this._pos += 1;
      } else {
        var result56 = null;
        if (context.reportMatchFailures) {
          this._matchFailed(new PEG.Parser.LiteralMatchFailure("1"));
        }
      }
      if (result56 !== null) {
        var result35 = result56;
      } else {
        if (this._input.substr(this._pos, 1) === "2") {
          var result55 = "2";
          this._pos += 1;
        } else {
          var result55 = null;
          if (context.reportMatchFailures) {
            this._matchFailed(new PEG.Parser.LiteralMatchFailure("2"));
          }
        }
        if (result55 !== null) {
          var result35 = result55;
        } else {
          if (this._input.substr(this._pos, 1) === "3") {
            var result54 = "3";
            this._pos += 1;
          } else {
            var result54 = null;
            if (context.reportMatchFailures) {
              this._matchFailed(new PEG.Parser.LiteralMatchFailure("3"));
            }
          }
          if (result54 !== null) {
            var result35 = result54;
          } else {
            if (this._input.substr(this._pos, 1) === "4") {
              var result53 = "4";
              this._pos += 1;
            } else {
              var result53 = null;
              if (context.reportMatchFailures) {
                this._matchFailed(new PEG.Parser.LiteralMatchFailure("4"));
              }
            }
            if (result53 !== null) {
              var result35 = result53;
            } else {
              if (this._input.substr(this._pos, 1) === "5") {
                var result52 = "5";
                this._pos += 1;
              } else {
                var result52 = null;
                if (context.reportMatchFailures) {
                  this._matchFailed(new PEG.Parser.LiteralMatchFailure("5"));
                }
              }
              if (result52 !== null) {
                var result35 = result52;
              } else {
                if (this._input.substr(this._pos, 1) === "6") {
                  var result51 = "6";
                  this._pos += 1;
                } else {
                  var result51 = null;
                  if (context.reportMatchFailures) {
                    this._matchFailed(new PEG.Parser.LiteralMatchFailure("6"));
                  }
                }
                if (result51 !== null) {
                  var result35 = result51;
                } else {
                  if (this._input.substr(this._pos, 1) === "7") {
                    var result50 = "7";
                    this._pos += 1;
                  } else {
                    var result50 = null;
                    if (context.reportMatchFailures) {
                      this._matchFailed(new PEG.Parser.LiteralMatchFailure("7"));
                    }
                  }
                  if (result50 !== null) {
                    var result35 = result50;
                  } else {
                    if (this._input.substr(this._pos, 1) === "8") {
                      var result49 = "8";
                      this._pos += 1;
                    } else {
                      var result49 = null;
                      if (context.reportMatchFailures) {
                        this._matchFailed(new PEG.Parser.LiteralMatchFailure("8"));
                      }
                    }
                    if (result49 !== null) {
                      var result35 = result49;
                    } else {
                      if (this._input.substr(this._pos, 1) === "9") {
                        var result48 = "9";
                        this._pos += 1;
                      } else {
                        var result48 = null;
                        if (context.reportMatchFailures) {
                          this._matchFailed(new PEG.Parser.LiteralMatchFailure("9"));
                        }
                      }
                      if (result48 !== null) {
                        var result35 = result48;
                      } else {
                        var result35 = null;;
                      };
                    };
                  };
                };
              };
            };
          };
        };
      };
    }
    if (result35 !== null) {
      var result36 = [];
      if (this._input.substr(this._pos, 1) === "0") {
        var result47 = "0";
        this._pos += 1;
      } else {
        var result47 = null;
        if (context.reportMatchFailures) {
          this._matchFailed(new PEG.Parser.LiteralMatchFailure("0"));
        }
      }
      if (result47 !== null) {
        var result37 = result47;
      } else {
        if (this._input.substr(this._pos, 1) === "1") {
          var result46 = "1";
          this._pos += 1;
        } else {
          var result46 = null;
          if (context.reportMatchFailures) {
            this._matchFailed(new PEG.Parser.LiteralMatchFailure("1"));
          }
        }
        if (result46 !== null) {
          var result37 = result46;
        } else {
          if (this._input.substr(this._pos, 1) === "2") {
            var result45 = "2";
            this._pos += 1;
          } else {
            var result45 = null;
            if (context.reportMatchFailures) {
              this._matchFailed(new PEG.Parser.LiteralMatchFailure("2"));
            }
          }
          if (result45 !== null) {
            var result37 = result45;
          } else {
            if (this._input.substr(this._pos, 1) === "3") {
              var result44 = "3";
              this._pos += 1;
            } else {
              var result44 = null;
              if (context.reportMatchFailures) {
                this._matchFailed(new PEG.Parser.LiteralMatchFailure("3"));
              }
            }
            if (result44 !== null) {
              var result37 = result44;
            } else {
              if (this._input.substr(this._pos, 1) === "4") {
                var result43 = "4";
                this._pos += 1;
              } else {
                var result43 = null;
                if (context.reportMatchFailures) {
                  this._matchFailed(new PEG.Parser.LiteralMatchFailure("4"));
                }
              }
              if (result43 !== null) {
                var result37 = result43;
              } else {
                if (this._input.substr(this._pos, 1) === "5") {
                  var result42 = "5";
                  this._pos += 1;
                } else {
                  var result42 = null;
                  if (context.reportMatchFailures) {
                    this._matchFailed(new PEG.Parser.LiteralMatchFailure("5"));
                  }
                }
                if (result42 !== null) {
                  var result37 = result42;
                } else {
                  if (this._input.substr(this._pos, 1) === "6") {
                    var result41 = "6";
                    this._pos += 1;
                  } else {
                    var result41 = null;
                    if (context.reportMatchFailures) {
                      this._matchFailed(new PEG.Parser.LiteralMatchFailure("6"));
                    }
                  }
                  if (result41 !== null) {
                    var result37 = result41;
                  } else {
                    if (this._input.substr(this._pos, 1) === "7") {
                      var result40 = "7";
                      this._pos += 1;
                    } else {
                      var result40 = null;
                      if (context.reportMatchFailures) {
                        this._matchFailed(new PEG.Parser.LiteralMatchFailure("7"));
                      }
                    }
                    if (result40 !== null) {
                      var result37 = result40;
                    } else {
                      if (this._input.substr(this._pos, 1) === "8") {
                        var result39 = "8";
                        this._pos += 1;
                      } else {
                        var result39 = null;
                        if (context.reportMatchFailures) {
                          this._matchFailed(new PEG.Parser.LiteralMatchFailure("8"));
                        }
                      }
                      if (result39 !== null) {
                        var result37 = result39;
                      } else {
                        if (this._input.substr(this._pos, 1) === "9") {
                          var result38 = "9";
                          this._pos += 1;
                        } else {
                          var result38 = null;
                          if (context.reportMatchFailures) {
                            this._matchFailed(new PEG.Parser.LiteralMatchFailure("9"));
                          }
                        }
                        if (result38 !== null) {
                          var result37 = result38;
                        } else {
                          var result37 = null;;
                        };
                      };
                    };
                  };
                };
              };
            };
          };
        };
      }
      while (result37 !== null) {
        result36.push(result37);
        if (this._input.substr(this._pos, 1) === "0") {
          var result47 = "0";
          this._pos += 1;
        } else {
          var result47 = null;
          if (context.reportMatchFailures) {
            this._matchFailed(new PEG.Parser.LiteralMatchFailure("0"));
          }
        }
        if (result47 !== null) {
          var result37 = result47;
        } else {
          if (this._input.substr(this._pos, 1) === "1") {
            var result46 = "1";
            this._pos += 1;
          } else {
            var result46 = null;
            if (context.reportMatchFailures) {
              this._matchFailed(new PEG.Parser.LiteralMatchFailure("1"));
            }
          }
          if (result46 !== null) {
            var result37 = result46;
          } else {
            if (this._input.substr(this._pos, 1) === "2") {
              var result45 = "2";
              this._pos += 1;
            } else {
              var result45 = null;
              if (context.reportMatchFailures) {
                this._matchFailed(new PEG.Parser.LiteralMatchFailure("2"));
              }
            }
            if (result45 !== null) {
              var result37 = result45;
            } else {
              if (this._input.substr(this._pos, 1) === "3") {
                var result44 = "3";
                this._pos += 1;
              } else {
                var result44 = null;
                if (context.reportMatchFailures) {
                  this._matchFailed(new PEG.Parser.LiteralMatchFailure("3"));
                }
              }
              if (result44 !== null) {
                var result37 = result44;
              } else {
                if (this._input.substr(this._pos, 1) === "4") {
                  var result43 = "4";
                  this._pos += 1;
                } else {
                  var result43 = null;
                  if (context.reportMatchFailures) {
                    this._matchFailed(new PEG.Parser.LiteralMatchFailure("4"));
                  }
                }
                if (result43 !== null) {
                  var result37 = result43;
                } else {
                  if (this._input.substr(this._pos, 1) === "5") {
                    var result42 = "5";
                    this._pos += 1;
                  } else {
                    var result42 = null;
                    if (context.reportMatchFailures) {
                      this._matchFailed(new PEG.Parser.LiteralMatchFailure("5"));
                    }
                  }
                  if (result42 !== null) {
                    var result37 = result42;
                  } else {
                    if (this._input.substr(this._pos, 1) === "6") {
                      var result41 = "6";
                      this._pos += 1;
                    } else {
                      var result41 = null;
                      if (context.reportMatchFailures) {
                        this._matchFailed(new PEG.Parser.LiteralMatchFailure("6"));
                      }
                    }
                    if (result41 !== null) {
                      var result37 = result41;
                    } else {
                      if (this._input.substr(this._pos, 1) === "7") {
                        var result40 = "7";
                        this._pos += 1;
                      } else {
                        var result40 = null;
                        if (context.reportMatchFailures) {
                          this._matchFailed(new PEG.Parser.LiteralMatchFailure("7"));
                        }
                      }
                      if (result40 !== null) {
                        var result37 = result40;
                      } else {
                        if (this._input.substr(this._pos, 1) === "8") {
                          var result39 = "8";
                          this._pos += 1;
                        } else {
                          var result39 = null;
                          if (context.reportMatchFailures) {
                            this._matchFailed(new PEG.Parser.LiteralMatchFailure("8"));
                          }
                        }
                        if (result39 !== null) {
                          var result37 = result39;
                        } else {
                          if (this._input.substr(this._pos, 1) === "9") {
                            var result38 = "9";
                            this._pos += 1;
                          } else {
                            var result38 = null;
                            if (context.reportMatchFailures) {
                              this._matchFailed(new PEG.Parser.LiteralMatchFailure("9"));
                            }
                          }
                          if (result38 !== null) {
                            var result37 = result38;
                          } else {
                            var result37 = null;;
                          };
                        };
                      };
                    };
                  };
                };
              };
            };
          };
        }
      }
      if (result36 !== null) {
        var result34 = [result35, result36];
      } else {
        var result34 = null;
        this._pos = savedPos5;
      }
    } else {
      var result34 = null;
      this._pos = savedPos5;
    }
    var result33 = result34 !== null
      ? (
      function (first, rest) {
          return [first].concat(rest);
      }
      ).apply(this, result34)
      : null;
    var result32 = result33 !== null
      ? (function() {  return parseInt((arguments[0]).join(""));  }).call(this, result33)
      : null;
    context.reportMatchFailures = savedReportMatchFailures;
    if (context.reportMatchFailures && result32 === null) {
      this._matchFailed(new PEG.Parser.NamedRuleMatchFailure("integer"));
    }
    
    this._cache["integer"][pos] = {
      length: this._pos - pos,
      result: result32
    };
    return result32;
  };
  
  return result;
})();
