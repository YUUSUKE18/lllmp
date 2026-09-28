import java.util.*;

public class Main {
    public static void main(String[] args) {
        String input = args[0];
        List<Map.Entry<Integer, Integer>> parts = new ArrayList<>();
        String[] tokens = input.split(",");
        
        for (String token : tokens) {
            if (token.trim().isEmpty()) continue;
            String[] values = token.trim().split(":");
            if (values.length != 2) continue;
            try {
                int val = Integer.parseInt(values[0]);
                int count = Integer.parseInt(values[1]);
                if (count < 0) continue;
                parts.add(new HashMap.Entry<>(val, count));
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        int count = 0;
        long sum = 0;
        for (Map.Entry<Integer, Integer> entry : parts) {
            count += entry.getValue();
            sum += entry.getKey() * entry.getValue();
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
