let val = parseInt("-9000000000000000"); // This will truncate last bits? No. 
// "-9e+15" is representable. But -10^16 (approx 32-bit range?) no wait: -9*10^{18} fits in signed int64 but not safe double precision.
