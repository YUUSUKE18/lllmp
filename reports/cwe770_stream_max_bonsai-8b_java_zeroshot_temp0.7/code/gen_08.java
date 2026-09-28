import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        List<Integer> numbers = new ArrayList<>();
        while ((line = br.readLine()) != null) {
            String[] parts = line.trim().split(",");
            for (String part : parts) {
                if (!part.isEmpty()) {
                    try {
                        int num = Integer.parseInt(part);
                        if (num > Integer.MIN_VALUE && num <= Integer.MAX_VALUE) {
                            numbers.add(num);
                        }
                    } catch (NumberFormatException e) {
                        // 忽略
                    }
                }
            }
        }
        int count = numbers.size();
        int max = Integer.MIN_VALUE;
        for (int num : numbers) {
            if (num > max) {
                max = num;
            }
        }
        System.out.printf("count=%d max=%d%n", count, max);
    }
}
