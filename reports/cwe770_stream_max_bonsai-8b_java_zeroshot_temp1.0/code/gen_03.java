import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in))) {
            String line = br.readLine();
            List<Integer> numbers = new ArrayList<>();
            String[] parts = line.split(",");
            for (String part : parts) {
                part = part.trim();
                if (!part.isEmpty() && Integer.parseInt(part) <= Integer.MAX_VALUE && Integer.parseInt(part) >= Integer.MIN_VALUE) {
                    numbers.add(Integer.parseInt(part));
                }
            }
            int count = numbers.size();
            int max = 0;
            for (int num : numbers) {
                if (num > max) {
                    max = num;
                }
            }
            System.out.println("count=" + count + " max=" + max);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
