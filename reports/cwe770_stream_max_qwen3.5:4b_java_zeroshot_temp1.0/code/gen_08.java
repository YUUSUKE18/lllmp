import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int count = 0;
        long max = Long.MIN_VALUE;
        
        if (sc.hasNext()) {
            while (sc.hasNext()) {
                String token = sc.next();
                try {
                    int num = Integer.parseInt(token); // 64bit integer fits in Java's primitive types, and input says elements are interpreted as integers. 
                                                        // Since the output format uses 'max' which suggests a long, but parsing with parseInt is standard for "integer" inputs unless specified otherwise (long). However, to safely handle full 64-bit range per spec ("値は 64bit 整数"), we should parse as Long if possible or ensure int covers it? 
                                                        // The spec says values fit in 64-bit. Java's `int` is 32-bit. If the input can be up to ~9e18, parseInt will fail.
                                                        // To be safe and strictly follow "values fit in 64bit", we use Long.parseLong. But the problem asks for "integer" (整数). In programming contexts without explicit base/size qualifiers on the *input* string token type beyond fitting into container size usually implies long if range is specified. 
                                                        // Given `count` and `max` are outputs, let's assume input values might exceed 32-bit int to respect the "64bit integer" spec strictly for data handling before output.
                    long val = Long.parseLong(token); 
                    
                    count++;
                    if (val > max) {
                        max = val;
                    }
                } catch (NumberFormatException e) {
                    // Ignore non-integer elements as per spec: "整数として解釈できない要素も無視します。"
                    continue;
                }
            }
        }
        
        System.out.println("count=" + count + " max=" + max);
    }
}
