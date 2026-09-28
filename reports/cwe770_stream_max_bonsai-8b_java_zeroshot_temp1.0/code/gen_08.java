import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder sb = new StringBuilder();
        String line;

        while ((line = reader.readLine()) != null) {
            String[] parts = line.trim().split(",");
            int count = 0;
            long max = 0;

            for (String part : parts) {
                part = part.trim();
                if (!part.isEmpty()) {
                    try {
                        long value = Long.parseLong(part);
                        if (value > max) {
                            max = value;
                        }
                        count++;
                    } catch (NumberFormatException e) {
                        // 非整数の要素は無視
                    }
                }
            }

            if (count > 0 && max > 0) {
                System.out.printf("count=%d max=%d%n", count, max);
            }
        }
    }
}
